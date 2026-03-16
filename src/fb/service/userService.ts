

import { V1UserApi } from "./user/user/UserV1UserApi"

const UserService = {
    V1User: new V1UserApi(),
}

export {
    UserService
}