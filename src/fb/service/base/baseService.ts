
/* ==================== 本地缓存接口 ==================== */

export interface ServiceLocalCacheInterface {
    getItem<T>(key: string): { expireAt: number; data: T } | null;
    hasItem(key: string): boolean;
    setItem<T = any>(key: string, value: T, cacheTime?: number): void;
    deleteItem(key: string): boolean;
    getRequestKey(url: string, params: any): Promise<string>;
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


    public async api<T>(path: string, params: any, api: () => Promise<T>, option?: ServiceRequestOptions): Promise<T> {
        const isCache =
            option?.cache?.isCache ??
            this.localCacheDefConf.isCache;

        if (!isCache || !this.localCache) {
            return api();
        }

        const cacheKey =
            option?.cache?.cacheKey ??
            await this.localCache.getRequestKey(path, params);

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


