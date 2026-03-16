

import { V1OrderApi } from "./user/order/UserV1OrderApi"
import { V1UserApi } from "./user/user/UserV1UserApi"

const UserService = {
    V1User: new V1UserApi(),
    V1Order: new V1OrderApi(),
}

export {
    UserService
}