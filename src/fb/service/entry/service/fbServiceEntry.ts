import { sha256 } from "hono/utils/crypto";
import { FbCommApiResponse } from "../../../model/response/fbModel";
import { FBNotAuthBaseApi } from "../../entry/api/fbApiEntry";
import { BaseService, ServiceLocalCacheInterface } from "../../base/baseService";

class FBLocalCache implements ServiceLocalCacheInterface {
    private store = new Map<string, { value: any; expireAt: number; cacheTime: number }>();

    private lastCleanTime = 0;
    private readonly CLEAN_INTERVAL = 10000;
    private cleaning = false;

    constructor() {
    }

    /* ---------- Cache API ---------- */

    getItem<T>(key: string): { expireAt: number; data: T } | null {
        if (key == "") return null;
        this.tryCleanAsync();

        const item = this.store.get(key);
        if (!item) return null;

        // if (item.expireAt <= Date.now()) {
        //     this.store.delete(key);
        //     return null;
        // }

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
            value: value,
            expireAt: Date.now() + cacheTime,
            cacheTime: cacheTime,
        });
    }

    deleteItem(key: string): boolean {
        return this.store.delete(key);
    }


    private tryCleanAsync() {
        const now = Date.now();
        if (now - this.lastCleanTime < this.CLEAN_INTERVAL) {
            return;
        }

        if (this.cleaning) {
            return;
        }

        this.cleaning = true;
        this.lastCleanTime = Date.now();

        queueMicrotask(() => {
            const now = Date.now();
            // var c = 0;
            for (const [k, v] of this.store) {
                if (now - v.expireAt > v.cacheTime * 30) {
                    this.store.delete(k);
                    // c++;
                }
            }

            // console.log("缓存清除时间:", this.lastCleanTime, "  清理数量:", c, "  剩余数量:", this.store.size);
            this.cleaning = false;
        });

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

    async getRequestKey(url: string, params: any): Promise<string> {
        const body = url + JSON.stringify(params)
        const key = await sha256(body) ?? "";

        return key;
    }

}

class FbServiceClass extends BaseService {
    public async request(path: string, params: any) {
        const api = FBNotAuthBaseApi
        const headers = await api.fBHeaderGeneratorInstance.getHeaders(path)
        const info = await api.fBHeaderGeneratorInstance.getInfo(path)

        const data = await this.api<FbCommApiResponse>(path, params, () => api.post(path, params, { headers, baseURL: info.serverInfo.apiServerAddress }))
        if (data.code == 14010) {
            FBNotAuthBaseApi.clearToken(path)
        }
        return data
    }

    public async virtualRequest(path: string, params: any) {
        const api = FBNotAuthBaseApi
        const headers = await api.fBHeaderGeneratorInstance.getHeaders(path)
        const info = await api.fBHeaderGeneratorInstance.getInfo(path)

        const data = await this.api<FbCommApiResponse>(path, params, () => api.post(path, params, { headers, baseURL: info.serverInfo.virtualAddress }))
        if (data.code == 14010) {
            FBNotAuthBaseApi.clearToken(path)
        }
        return data
    }
}

export const FbServiceEntry = new FbServiceClass({
    localCacheDefConf: {
        isCache: true,
        cacheTime: 1_000 // 1 秒（毫秒）
    },
    localCache: new FBLocalCache()
});
