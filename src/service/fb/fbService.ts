import { LanguageStaticService } from "./language/StaticService"
import { MatchService } from "./user/MatchService"
import { UserService } from "./user/UserService"
import { BetService } from "./order/BetService"

const FbService = {
    LanguageStaticService: new LanguageStaticService(),
    MatchService: new MatchService(),
    UserService: new UserService(),
    BetService: new BetService(),
}

export {
    FbService
}