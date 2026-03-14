export enum SERVER_ERR_CODE_ENUMS {
    SUCCESS = 0, 

    REQUEST_ERROR = 4001, //请求异常
    INVALID_TOKEN = 4002, //无效Token
    INVALID_RESPONSE_STATUS = 4003, //无效响应码
    INVALID_SIGN = 4004, //无效签名
    FAIL_REQUEST = 4005, //请求失败
    REQUEST_CACHING = 4006, //请求缓存中



    FB_SERVER_ERR = 14108, 
}