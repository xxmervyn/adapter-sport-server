

import { V1UserApi } from "./user/user/V1UserApi"

const UserService = {
    V1User: new V1UserApi(),
}

export {
    UserService
}