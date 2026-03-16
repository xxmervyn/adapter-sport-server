import { HonoRequest } from "hono"
import { UserServiceEntry } from "../../entry/service/userServiceEntry"

export class V1OrderApi {
    public batchBetMatchMarketOfJumpLine(params: any, req: HonoRequest) {
        return UserServiceEntry.request('/openPlayer/newFbSportOrder', params, req)
    }
   

    public getStakeOrderStatus(params: any, req: HonoRequest) {
        return UserServiceEntry.request('/openPlayer/getFbSportOrderStatus', params, req)
    }


    public newReserveBetList(params: any, req: HonoRequest) {
        return UserServiceEntry.request('/openPlayer/getFbReserveBetList', params, req)
    }


    public newBetList(params: any, req: HonoRequest) {
        return UserServiceEntry.request('/openPlayer/getFbBetList', params, req)
    }
}