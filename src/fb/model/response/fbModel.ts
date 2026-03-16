export interface FbCommApiResponse {
    code: number
    data?: any
    success: boolean
    message?: string

    eCode?: number //内部用
}


export interface TokenApiResponseData {
    serverInfo: {
        apiEmbeddedServerAddress: string;
        apiServerAddress: string;
        pcAddress: string;
        pushServerAddress: string;
        virtualAddress: string;
        ouPcAddress: string;
        h5Address: string;
    };
    themeBgColor: string;
    domains: Array<{
        domains: string[];
        type: number;
    }>;
    userId: number;
    token: string;
    themeFgColor: string;
    refreshToken?: string;
    expire?: number;
}