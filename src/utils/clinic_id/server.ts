import { getClinic } from "./clinic_check";
import { RoleNum } from "../roles";
import assert from "assert";
import { headers } from "next/headers";

/// get clinic ID in "server component",
/// if passed in role, it will check return uid if the role is Agc
/// otherwise check clinic id from url host
export const getCliId_Server=(userRole?:RoleNum,uid?:string):string|null=>{
    assert(userRole!==RoleNum.Agc||uid!==null,"please pass in agency's uid to getCliId_Server");
    if(userRole===RoleNum.Agc)return uid!;
    const hostName=headers().get("host");
    return getClinic(hostName);
}