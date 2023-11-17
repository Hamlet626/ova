import { EDStatus } from "../types/status";

export interface BasicInfoDoc{
    uid:string,
    name:string, 
    email:string,
    avatar?:string,
    lastLogin?:number,
    createTime:number,
}

export interface GCAgcInfoDoc{
    agcid:string,
    price:number,
    status:EDStatus
}
