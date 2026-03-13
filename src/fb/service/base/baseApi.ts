import { API_BASE_URL_ENUMS } from "../../enums/apiBaseUrlEnum";
import { FbApiError } from "../../model/comm/Error";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS";

export interface BaseApiOptions {
    baseURL?: API_BASE_URL_ENUMS;
    timeout?: number;
    headers?: HeadersInit;
    retry?: number;
    retryDelay?: number;
}

export interface ApiRequestOptions extends Omit<RequestInit, 'headers' | 'method' | 'body'> {
    baseURL?: API_BASE_URL_ENUMS;
    headers?: HeadersInit;
    retry?: number;
    retryDelay?: number;
    params?: Record<string, any>;
}

export type AuthorizationHeaderFn = (headers: HeadersInit) => HeadersInit | Promise<HeadersInit>;
export type FetchFn = (req: Request) => Promise<Response>;
export type IsValidatedRequestFn = (req: Request) => Promise<boolean>;

export class BaseApi {
    protected baseURL: string;
    protected timeout?: number;
    protected defaultHeaders: Record<string, string>;
    protected retry: number;
    protected retryDelay: number;

    constructor(options: BaseApiOptions = {}) {
        this.baseURL = options.baseURL ?? "";
        this.timeout = options.timeout;
        this.retry = options.retry ?? 1;
        this.retryDelay = options.retryDelay ?? 0;
        this.defaultHeaders = this.normalizeHeaders(options.headers) as Record<string, string>;
    }

    /* ================= 可覆盖方法 ================= */

    protected validateStatus(status: number): boolean {
        return status >= 200 && status < 300;
    }

    protected fetch(req: Request): Promise<Response> {
        return fetch(req)
    }


    protected async getAuthorizationHeader(): Promise<HeadersInit> {
        return {}
    }

    protected async isValidatedRequest(req: Request): Promise<boolean> {
        return true
    }

    /* ================= 工具方法 ================= */

    protected async sleep(ms: number): Promise<void> {
        if (ms > 0) {
            await new Promise(resolve => setTimeout(resolve, ms));
        }
    }

    protected async withTimeout<T>(promise: Promise<T>, ms?: number): Promise<T> {
        if (!ms) {
            return promise;
        }

        return new Promise<T>((resolve, reject) => {
            const timer = setTimeout(() => {
                reject(new Error(`Request timeout after ${ms}ms`));
            }, ms);

            promise
                .then(res => {
                    clearTimeout(timer);
                    resolve(res);
                })
                .catch(err => {
                    clearTimeout(timer);
                    reject(err);
                });
        });
    }

    protected normalizeHeaders(headers?: HeadersInit): Record<string, string> {
        const result: Record<string, string> = {};

        if (!headers) {
            return result;
        }

        if (headers instanceof Headers) {
            headers.forEach((value, key) => {
                result[key] = value;
            });
        } else if (Array.isArray(headers)) {
            headers.forEach(([key, value]) => {
                result[key] = value;
            });
        } else {
            Object.assign(result, headers);
        }

        return result;
    }

    protected buildUrl(url: string, baseURL?: string, params?: Record<string, any>): string {
        let fullUrl = (baseURL ?? this.baseURL) + url;

        if (params && Object.keys(params).length > 0) {
            const searchParams = new URLSearchParams();

            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    if (Array.isArray(value)) {
                        value.forEach(item => {
                            if (item !== undefined && item !== null) {
                                searchParams.append(key, String(item));
                            }
                        });
                    } else {
                        searchParams.append(key, String(value));
                    }
                }
            });

            const queryString = searchParams.toString();
            if (queryString) {
                fullUrl += (fullUrl.includes("?") ? "&" : "?") + queryString;
            }
        }

        return fullUrl;
    }

    protected async getMergedHeaders(baseURL: string, ...headersList: (HeadersInit | undefined)[]): Promise<Record<string, string>> {
        const result: Record<string, string> = {};

        // 合并默认 headers
        Object.assign(result, this.defaultHeaders);

        // 合并授权 headers
        const authHeaders = await this.getAuthorizationHeader();
        Object.assign(result, this.normalizeHeaders(authHeaders));

        // 合并其他 headers
        for (const headers of headersList) {
            if (headers) {
                Object.assign(result, this.normalizeHeaders(headers));
            }
        }

        if (result["Host"] && result["Host"] != "" && baseURL.split("//").length > 1) {
            result["Host"] = baseURL.split("//")[1].split("/")[0];
        }

        if (result["Origin"] && result["Origin"] != "") {
            result["Origin"] = baseURL;
        }

        if (result["Referer"] && result["Referer"] !== "") {
            let referer = baseURL;

            if (!referer.endsWith("/")) {
                referer += "/";
            }

            result["Referer"] = referer;
        }
        return result;
    }

    protected async parseResponse<T>(response: Response): Promise<T> {

        // 根据 Content-Type 解析响应体
        const contentType = response.headers.get("content-type") || "";
        let data: any;

        try {
            if (contentType.includes("application/json")) {
                data = await response.json();
            } else if (contentType.includes("text/")) {
                data = await response.text();
            } else if (contentType.includes("multipart/form-data")) {
                data = await response.formData();
            } else {
                data = await response.blob();
            }
        } catch (error) {
            data = await response.text();
        }

        return data as T
    }

    /* ================= 核心请求方法 ================= */

    protected async request<T>(method: HttpMethod, url: string, data?: any, options?: ApiRequestOptions): Promise<T> {
        const maxRetry = options?.retry ?? this.retry;
        const retryDelay = options?.retryDelay ?? this.retryDelay;
        let attempt = 0;
        let lastError: any;

        while (attempt < maxRetry) {
            attempt++;
            try {
                const baseURL = options?.baseURL ?? this.baseURL;
                const headers = await this.getMergedHeaders(baseURL, options?.headers);
                const fullUrl = this.buildUrl(url, baseURL, method === "GET" ? data : options?.params);

                let body: BodyInit | null | undefined = undefined;

                // 处理请求体
                if (method !== "GET" && data !== undefined) {
                    if (data instanceof FormData || data instanceof URLSearchParams || data instanceof Blob || typeof data === 'string') {
                        body = data;
                    } else {
                        body = JSON.stringify(data);
                        if (!headers['Content-Type']) {
                            headers['Content-Type'] = 'application/json';
                        }
                    }
                }

                const fetchOptions: RequestInit = {
                    method,
                    headers,
                    body,
                    ...options,
                };

                delete (fetchOptions as any).baseURL;
                delete (fetchOptions as any).retry;
                delete (fetchOptions as any).retryDelay;
                delete (fetchOptions as any).params;

                const request = new Request(fullUrl, fetchOptions);
                const isValidatedRequest = await this.isValidatedRequest(request);
                if (isValidatedRequest == false) {
                    return {} as T;
                }

                const fetchPromise = this.fetch(request);
                const response = await this.withTimeout(fetchPromise, this.timeout);

                // 状态码验证
                if (!this.validateStatus(response.status)) {

                    const err = new FbApiError(
                        `Request failed with status ${response.status}`,
                        response.status,
                        fullUrl,
                        this.parseResponse(response),
                    );

                    console.error("API ERROR:", err);
                    return {} as T;
                }

                return this.parseResponse(response);

            } catch (error) {
                lastError = error;

                // 客户端错误直接返回
                if (error instanceof FbApiError && error.status && error.status >= 400 && error.status < 500) {
                    console.error("Client Error:", error);
                    return {} as T;
                }

                // retry结束
                if (attempt >= maxRetry) {
                    console.error("Request failed after retries:", {
                        url,
                        method,
                        data,
                        error
                    });

                    return {} as T;
                }

                // 指数退避
                const delay = retryDelay * Math.pow(2, attempt - 1);
                await this.sleep(delay);
            }
        }

        console.error("Unexpected request failure:", lastError);
        return {} as T;
    }

    /* ================= 便捷方法 ================= */

    public get<T>(url: string, params?: Record<string, any>, options?: ApiRequestOptions): Promise<T> {
        return this.request<T>("GET", url, params, options);
    }

    public post<T>(url: string, data?: any, options?: ApiRequestOptions): Promise<T> {
        return this.request<T>("POST", url, data, options);
    }

    public put<T>(url: string, data?: any, options?: ApiRequestOptions): Promise<T> {
        return this.request<T>("PUT", url, data, options);
    }

    public delete<T>(url: string, params?: Record<string, any>, options?: ApiRequestOptions): Promise<T> {
        return this.request<T>("DELETE", url, params, options);
    }

    public patch<T>(url: string, data?: any, options?: ApiRequestOptions): Promise<T> {
        return this.request<T>("PATCH", url, data, options);
    }

    public head<T = void>(
        url: string,
        params?: Record<string, any>,
        options?: ApiRequestOptions
    ): Promise<T> {
        return this.request<T>("HEAD", url, params, options);
    }

    public options<T>(
        url: string,
        params?: Record<string, any>,
        options?: ApiRequestOptions
    ): Promise<T> {
        return this.request<T>("OPTIONS", url, params, options);
    }

    public formPost<T>(url: string, form: Record<string, any> | URLSearchParams | FormData, options?: ApiRequestOptions): Promise<T> {
        let body: FormData | URLSearchParams;

        if (form instanceof FormData || form instanceof URLSearchParams) {
            body = form;
        } else {
            body = new URLSearchParams();
            Object.entries(form).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    body.append(key, String(value));
                }
            });
        }

        return this.request<T>("POST", url, body, {
            ...options,
            headers: {
                ...options?.headers,
            },
        });
    }
}



/**

    const authApi = createAuthApi(
    'https://api.example.com',
    () => localStorage.getItem('token') || ''
    );

    // 3. 各种请求示例
    async function example2() {
    // GET 请求
    const users = await myApi.get<User[]>('/users', { page: 1, limit: 10 });
    
    // POST 请求
    const newUser = await myApi.post<User>('/users', {
        name: 'John',
        email: 'john@example.com'
    });
    
    // PUT 请求
    const updatedUser = await myApi.put<User>(`/users/${newUser.data.id}`, {
        name: 'John Updated'
    });
    
    // DELETE 请求
    await myApi.delete(`/users/${updatedUser.data.id}`);
    
    // 表单提交
    const loginResult = await myApi.formPost<{ token: string }>('/login', {
        username: 'john',
        password: 'secret'
    });
    
    // 文件上传
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput && fileInput.files) {
        const uploadResult = await myApi.upload<{ url: string }>(
        '/upload',
        fileInput.files[0],
        'avatar',
        { description: 'Profile picture' }
        );
    }
    }
 */