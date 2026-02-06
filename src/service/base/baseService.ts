import { HonoRequest } from "hono";
import { sha256 } from "hono/utils/crypto";

/* ==================== 本地缓存接口 ==================== */

export interface ServiceLocalCacheInterface {
    getItem<T>(key: string): { expireAt: number; data: T } | null;
    hasItem(key: string): boolean;
    setItem<T = any>(key: string, value: T, cacheTime?: number): void;
    deleteItem(key: string): boolean;
    getRequestKey(request: HonoRequest): Promise<string>;
    clearTTLAll(): void;
}

/* ==================== Service 配置 ==================== */

export interface BaseServiceOptions {
    localCacheDefConf: {
        isCache?: boolean;
        cacheTime?: number; // 毫秒
    };
    localCache?: ServiceLocalCacheInterface;
}

export interface ServiceRequestOptions {
    cache?: {
        isCache?: boolean;
        cacheTime?: number; // 毫秒
        cacheKey?: string;
    };
}

/* ==================== BaseService ==================== */

export class BaseService {
    protected localCache?: ServiceLocalCacheInterface;
    protected localCacheDefConf: {
        isCache?: boolean;
        cacheTime?: number;
    };

    constructor(
        options: BaseServiceOptions = {
            localCacheDefConf: { isCache: false, cacheTime: 0 }
        }
    ) {
        this.localCacheDefConf = options.localCacheDefConf;
        this.localCache = options.localCache;

        if (!this.localCache) {
            this.localCacheDefConf.isCache = false;
        }
    }


    isSuccess(data: unknown): data is { code: number } {
        return (
            typeof data === "object" &&
            data !== null &&
            "code" in data &&
            (data as any).code === 0
        );
    }
    

    public async api<T>(
        req: HonoRequest,
        api: () => Promise<T>,
        option?: ServiceRequestOptions
    ): Promise<T> {
        const isCache =
            option?.cache?.isCache ??
            this.localCacheDefConf.isCache;

        if (!isCache || !this.localCache) {
            return api();
        }

        const cacheKey =
            option?.cache?.cacheKey ??
            await this.localCache.getRequestKey(req);

        const item = this.localCache.getItem<T>(cacheKey);
        if (item && item.expireAt > Date.now()) {
            return item.data;
        }

        const cacheTime =
            option?.cache?.cacheTime ??
            this.localCacheDefConf.cacheTime ??
            0;

        const data = await api();
        if (this.isSuccess(data)) {
            this.localCache.setItem(cacheKey, data, cacheTime);
        }
        
        return data;
    }
}

/* ==================== FBLocalCache ==================== */

class FBLocalCache implements ServiceLocalCacheInterface {
    private store = new Map<
        string,
        { value: any; expireAt: number }
    >();

    /* ---------- key 生成工具 ---------- */

    private normalizeQuery(url: URL): string {
        return Array.from(url.searchParams.entries())
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([k, v]) => `${k}=${v}`)
            .join("&");
    }

    private normalizeBody(body: any, depth = 0): any {
        if (depth > 5) return body;

        if (Array.isArray(body)) {
            return body
                .map(v => this.normalizeBody(v, depth + 1))
                .sort((a, b) =>
                    JSON.stringify(a).localeCompare(JSON.stringify(b))
                );
        }

        if (body && typeof body === "object") {
            return Object.keys(body)
                .sort()
                .reduce((acc, k) => {
                    acc[k] = this.normalizeBody(body[k], depth + 1);
                    return acc;
                }, {} as any);
        }

        return body;
    }

    private stableStringify(obj: any): string {
        if (!obj || typeof obj !== "object") {
            return String(obj);
        }
        return JSON.stringify(obj, Object.keys(obj).sort());
    }

    /* ---------- Cache API ---------- */

    getItem<T>(key: string): { expireAt: number; data: T } | null {
        const item = this.store.get(key);
        if (!item) return null;

        if (item.expireAt <= Date.now()) {
            this.store.delete(key);
            return null;
        }

        return {
            expireAt: item.expireAt,
            data: item.value as T
        };
    }

    hasItem(key: string): boolean {
        return this.getItem(key) !== null;
    }

    setItem<T>(key: string, value: T, cacheTime: number = 0): void {
        this.store.set(key, {
            value,
            expireAt: Date.now() + cacheTime
        });
    }

    deleteItem(key: string): boolean {
        return this.store.delete(key);
    }

    clearTTLAll(): void {
        const now = Date.now();
        for (const [k, v] of this.store) {
            if (v.expireAt <= now) {
                this.store.delete(k);
            }
        }
    }

    /* ---------- Request Key ---------- */

    async getRequestKey(request: HonoRequest): Promise<string> {
        const raw = request.raw;
        const url = new URL(raw.url);
    
        const base: any = {
            v: 1,
            method: raw.method.toUpperCase(),
            path: url.pathname,
            query: this.normalizeQuery(url)
        };
    
        if (raw.method !== "GET" && raw.method !== "HEAD") {
            try {
                const body = await request.json();
                base.body = this.normalizeBody(body);
            } catch {
                try {
                    const text = await request.text();
                    if (text) {
                        base.body = await sha256(text);
                    }
                } catch {
                }
            }
        }
        const key = await sha256(this.stableStringify(base)) ?? request.path;
    
        return key;
    }
    
}

/* ==================== 工厂 & 默认实例 ==================== */

export function createService(options: BaseServiceOptions): BaseService {
    return new BaseService(options);
}

export const FbNotAuthService = createService({
    localCacheDefConf: {
        isCache: true,
        cacheTime: 1_000 // 1 秒（毫秒）
    },
    localCache: new FBLocalCache()
});
