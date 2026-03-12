import { sha256 } from "hono/utils/crypto";
import { FbCommApiResponse } from "../../model/response/fbModel";
import { FBNotAuthBaseApi } from "../base/baseApi";
import { BaseService, ServiceLocalCacheInterface } from "../base/baseService";

class FBLocalCache implements ServiceLocalCacheInterface {
    private store = new Map<string, { value: any; expireAt: number }>();

    /* ---------- Cache API ---------- */

    getItem<T>(key: string): { expireAt: number; data: T } | null {
        if (key == "") return null;
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

    async getRequestKey(url: string, params: any): Promise<string> {
        const body = url + JSON.stringify(params)
        const key = await sha256(body) ?? "";

        return key;
    }

}

class FbServiceClass extends BaseService {
    public async request(url: string, params: any, api = FBNotAuthBaseApi) {
        return await this.api<FbCommApiResponse>(url, params, () => api.post(url, params))
    }
}

export const FbServiceEntry = new FbServiceClass({
    localCacheDefConf: {
        isCache: true,
        cacheTime: 1_000 // 1 秒（毫秒）
    },
    localCache: new FBLocalCache()
});
