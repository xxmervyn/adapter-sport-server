import { LanguageStaticService } from "./language/StaticService"
import { MatchService } from "./user/MatchService"

const FbService = {
    LanguageStaticService: new LanguageStaticService(),
    MatchService: new MatchService(),
}

export {
    FbService
}