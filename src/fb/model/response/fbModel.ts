export interface FbCommApiResponse {
    code: number
    data?: any
    success: boolean
    message?: string

    eCode?: number //内部用
}