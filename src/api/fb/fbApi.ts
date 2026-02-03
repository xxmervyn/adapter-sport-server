

import { V1BulletinApi } from "./v1/BulletinApi"
import { V1MatchApi } from "./v1/MatchApi"
import { V1MerchantApi } from "./v1/MerchantApi"
import { V1SportRuleApi } from "./v1/SportRuleApi"
import { V1OrderApi } from "./v1/OrderApi"
import { V1UserApi } from "./v1/UserApi"
import { LanguageStaticApi } from "./language/StaticApi"
import { VirtualV1MatchApi } from "./virtual/V1MatchApi"
import { VirtualV1StatApi } from "./virtual/V1StatApi"

const FbApi = {
    V1BulletinApi,
    V1MatchApi,
    V1MerchantApi,
    V1SportRuleApi,
    V1OrderApi,
    V1UserApi,
    LanguageStaticApi,
    VirtualV1MatchApi,
    VirtualV1StatApi,
}

export {
    FbApi
}