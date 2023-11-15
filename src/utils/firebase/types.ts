import { EDStatus } from "../types/status";

export interface BasicInfoDoc{
    uid:string,
    name:string, 
    avatar?:string,
    createTime:number,
}

export interface GCAgcInfoDoc{
    agcid:string,
    price:number,
    status:EDStatus
}
