

import { V1BulletinApi } from "./fb/v1/BulletinApi"
import { V1MatchApi } from "./fb/v1/MatchApi"
import { V1MerchantApi } from "./fb/v1/MerchantApi"
import { V1SportRuleApi } from "./fb/v1/SportRuleApi"
import { V1OrderApi } from "./fb/v1/OrderApi"
import { V1OrderReserveApi } from "./fb/v1/OrderReserveApi"
import { V1UserApi } from "./fb/v1/UserApi"
import { LanguageStaticApi } from "./fb/language/StaticApi"
import { VirtualV1MatchApi } from "./fb/virtual/V1MatchApi"
import { VirtualV1StatApi } from "./fb/virtual/V1StatApi"

const FbService = {
    V1Bulletin: new V1BulletinApi(),
    V1Match: new V1MatchApi(),
    V1Merchant: new V1MerchantApi(),
    V1SportRule: new V1SportRuleApi(),
    V1Order: new V1OrderApi(),
    V1OrderReserveApi: new V1OrderReserveApi(),
    V1User: new V1UserApi(),
    LanguageStatic: new LanguageStaticApi(),
    VirtualV1Match: new VirtualV1MatchApi(),
    VirtualV1Stat: new VirtualV1StatApi(),
}

export {
    FbService
}