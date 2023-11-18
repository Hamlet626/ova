import { EDStatus, RcpStatus } from "../types/status";

export interface BasicInfoDoc{
    uid:string,
    name:string, 
    email:string,
    avatar?:string,
    lastLogin?:number,
    createTime:number,
}

// export interface RcpBsInfoDoc extends BasicInfoDoc{
//     agcs:string[],
// }

export interface GCAgcInfoDoc{
    agcid:string,
    price:number,
    status:EDStatus,
}

export interface RcpAgcInfoDoc{
    agcid:string,
    status:RcpStatus,
    recommends?:string[]
}
