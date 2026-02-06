import { API_BASE_URL_ENUMS } from "../../enums/apiBaseUrlEnum";
import { FbApiError } from "../../model/comm/Error";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS";

export interface BaseApiOptions {
    baseURL?: API_BASE_URL_ENUMS;
    timeout?: number;
    headers?: HeadersInit;
    retry?: number;
    retryDelay?: number;
    validateStatus?: (status: number) => boolean;
}

export interface ApiRequestOptions extends Omit<RequestInit, 'headers' | 'method' | 'body'> {
    baseURL?: API_BASE_URL_ENUMS;
    headers?: HeadersInit;
    retry?: number;
    retryDelay?: number;
    params?: Record<string, any>;
}

export type AuthorizationHeaderFn = (headers: HeadersInit) => HeadersInit | Promise<HeadersInit>;

export class BaseApi {
    protected baseURL: string;
    protected timeout?: number;
    protected defaultHeaders: Record<string, string>;
    protected retry: number;
    protected retryDelay: number;
    protected validateStatus: (status: number) => boolean;
    protected getAuthorizationHeader: AuthorizationHeaderFn;

    constructor(options: BaseApiOptions = {}, getAuthorizationHeader?: AuthorizationHeaderFn) {
        this.baseURL = options.baseURL ?? "";
        this.timeout = options.timeout;
        this.retry = options.retry ?? 1;
        this.retryDelay = options.retryDelay ?? 0;
        this.defaultHeaders = this.normalizeHeaders(options.headers) as Record<string, string>;
        this.validateStatus = options.validateStatus ?? ((status) => status >= 200 && status < 300);
        this.getAuthorizationHeader = getAuthorizationHeader ?? (() => ({}));
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
        const authHeaders = await this.getAuthorizationHeader(result);
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

                // 移除重复的 options
                delete (fetchOptions as any).baseURL;
                delete (fetchOptions as any).retry;
                delete (fetchOptions as any).retryDelay;
                delete (fetchOptions as any).params;

                console.log("请求:", fullUrl, "   data:", data, "   ", fetchOptions);



                const fetchPromise = fetch(fullUrl, fetchOptions);
                const response = await this.withTimeout(fetchPromise, this.timeout);


                // 验证状态码
                if (!this.validateStatus(response.status)) {
                    throw new FbApiError(
                        `Request failed with status ${response.status}`,
                        response.status,
                        fullUrl,
                        this.parseResponse(response),
                    );
                }

                return this.parseResponse(response);

            } catch (error) {
                lastError = error;

                if (error instanceof FbApiError && error.status && error.status >= 400 && error.status < 500) {
                    throw error;
                }

                // 如果是网络错误或其他非客户端错误，继续重试
                if (attempt >= maxRetry) {
                    if (error instanceof FbApiError) {
                        throw error;
                    }
                    throw new FbApiError(
                        (error as any)?.message || 'Request failed',
                        (error as any).status,
                        (error as any).url,
                    );
                }

                // 指数退避
                const delay = retryDelay * Math.pow(2, attempt - 1);
                await this.sleep(delay);
            }
        }

        throw lastError;
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

/* ================= 便捷函数和实例 ================= */

// 创建 API 实例的工厂函数
export function createApi(options: BaseApiOptions = {}, getAuthorizationHeader?: AuthorizationHeaderFn): BaseApi {
    return new BaseApi(options, getAuthorizationHeader);
}


export const FBNotAuthBaseApi = createApi(
    {
        baseURL: API_BASE_URL_ENUMS.HTTPS_API_A233Z1_COM,
        timeout: 5000,
        retry: 1,
        retryDelay: 1000,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'zh-CN,zh;q=0.9',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36',
            'sec-ch-ua': '"Not(A:Brand";v="8", "Chromium";v="144", "Google Chrome";v="144"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'Host': 'api.a233z1.com',
            'Origin': API_BASE_URL_ENUMS.HTTPS_API_A233Z1_COM,
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'cross-site',
        }
    }, () => {

        return {}
    });



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