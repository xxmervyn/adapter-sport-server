

import { V1BulletinApi } from "./fb/v1/BulletinApi"
import { V1MatchApi } from "./fb/v1/MatchApi"
import { V1MerchantApi } from "./fb/v1/MerchantApi"
import { V1SportRuleApi } from "./fb/v1/SportRuleApi"
import { V1OrderApi } from "./fb/v1/OrderApi"
import { V1OrderReserveApi } from "./fb/v1/OrderReserveApi"
import { V1OrderCashOutApi } from "./fb/v1/OrderCashOutApi"
import { V1OrderNewBetReserveApi } from "./fb/v1/OrderNewBetReserveApi"
import { V1OrderNewBetApi } from "./fb/v1/OrderNewBetApi"
import { V1SportApi } from "./fb/v1/SportApi"
import { V1TopicApi } from "./fb/v1/TopicApi"
import { V1OrderCashOutReserveApi } from "./fb/v1/OrderCashOutReserveApi"
import { V1OrderReserveCashOutApi } from "./fb/v1/OrderReserveCashOutApi"
import { V1OrderBetApi } from "./fb/v1/OrderBetApi"
import { V1UserApi } from "./fb/v1/UserApi"
import { LanguageStaticApi } from "./fb/language/StaticApi"
import { VirtualV1MatchApi } from "./fb/virtual/V1MatchApi"
import { VirtualV1StatApi } from "./fb/virtual/V1StatApi"
import { V1OrderSingleApi } from "./fb/virtual/V1OrderSingleApi"
import { V1OrderOddsCartApi } from "./fb/virtual/V1OrderOddsCartApi"

const FbService = {
    V1Bulletin: new V1BulletinApi(),
    V1Match: new V1MatchApi(),
    V1Merchant: new V1MerchantApi(),
    V1SportRule: new V1SportRuleApi(),
    V1Sport: new V1SportApi(),
    V1Topic: new V1TopicApi(),
    V1Order: new V1OrderApi(),
    V1OrderReserve: new V1OrderReserveApi(),
    V1OrderNewBet: new V1OrderNewBetApi(),
    V1OrderCashOut: new V1OrderCashOutApi(),
    V1OrderCashOutReserve: new V1OrderCashOutReserveApi(),
    V1OrderReserveCashOut: new V1OrderReserveCashOutApi(),
    V1OrderNewBetReserve: new V1OrderNewBetReserveApi(),
    V1OrderBet: new V1OrderBetApi(),
    V1User: new V1UserApi(),
    LanguageStatic: new LanguageStaticApi(),
    VirtualV1Match: new VirtualV1MatchApi(),
    VirtualV1Stat: new VirtualV1StatApi(),
    V1OrderOddsCart: new V1OrderOddsCartApi(),
    V1OrderSingle: new V1OrderSingleApi(),
}

export {
    FbService
}