
/* ==================== 本地缓存接口 ==================== */

import { SERVER_ERR_CODE_ENUMS } from "../../enums/serverErrCodeEnum";

export interface ServiceLocalCacheInterface {
    getItem<T>(key: string): { expireAt: number; data: T } | null;
    hasItem(key: string): boolean;
    setItem<T = any>(key: string, value: T, cacheTime?: number): void;
    deleteItem(key: string): boolean;
    getRequestKey(requestKey: string, params: any): Promise<string>;
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

    private cleaning = false;
    private lastCleanTime = 0;

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

    public async api<T>(requestKey: string, params: any, api: () => Promise<T>, serverOptions?: ServiceRequestOptions): Promise<T> {
        const isCache = serverOptions?.cache?.isCache ?? this.localCacheDefConf.isCache;

        if (!isCache || !this.localCacheEntry) {
            return api();
        }

        const cacheKey = serverOptions?.cache?.cacheKey ?? await this.localCacheEntry.getRequestKey(requestKey, params);

        if (cacheKey == "") {
            return api();
        }

        const item = this.localCacheEntry.getItem<T>(cacheKey);

        if (item && item.expireAt > Date.now()) {
            return item.data;
        }

        const cacheTime = serverOptions?.cache?.cacheTime ?? this.localCacheDefConf.cacheTime ?? 0;

        try {
            const data = await api();
            if (this.isSuccess(data)) {
                this.localCacheEntry.setItem(cacheKey, data, cacheTime);
            }
            return data;
        } catch (error) {
            return ({ code: 0, success: true, eCode: SERVER_ERR_CODE_ENUMS.FAIL_REQUEST } as T);
        }
    }

}


