
/* ==================== 本地缓存接口 ==================== */

import { SERVER_ERR_CODE_ENUMS } from "../../enums/serverErrCodeEnum";

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
    protected localCacheEntry?: ServiceLocalCacheInterface;
    protected localCacheDefConf: {
        isCache?: boolean;
        cacheTime?: number;
    };
    protected cacheStatusMap: Map<string, boolean> = new Map()

    constructor(options: BaseServiceOptions = { localCacheDefConf: { isCache: false, cacheTime: 0 } }) {
        this.localCacheDefConf = options.localCacheDefConf;
        this.localCacheEntry = options.localCache;

        if (!this.localCacheEntry) {
            this.localCacheDefConf.isCache = false;
        }
    }


    protected isSuccess(data: any): data is { code: number } {
        return (
            typeof data === "object" &&
            data !== null &&
            "code" in data &&
            (data as any).code === 0
        );
    }

    public async api<T>(path: string, params: any, api: () => Promise<T>, option?: ServiceRequestOptions): Promise<T> {
        const isCache = option?.cache?.isCache ?? this.localCacheDefConf.isCache;

        if (!isCache || !this.localCacheEntry) {
            return api();
        }

        const cacheKey = option?.cache?.cacheKey ?? await this.localCacheEntry.getRequestKey(path, params);

        const item = this.localCacheEntry.getItem<T>(cacheKey);
        const isExist = this.cacheStatusMap.has(cacheKey)
        if (item && item.expireAt > Date.now() && isExist == false) {
            return item.data;
        }

        if (isExist) {
            //缓存中
            return item ? item.data : {code: SERVER_ERR_CODE_ENUMS.REQUEST_CACHING} as T
        }

        this.cacheStatusMap.set(cacheKey, true)

        const cacheTime = option?.cache?.cacheTime ?? this.localCacheDefConf.cacheTime ?? 0;
        const data = await api();
        if (this.isSuccess(data)) {
            this.localCacheEntry.setItem(cacheKey, data, cacheTime);
        }
        this.cacheStatusMap.delete(cacheKey)

        return data;
    }
}


