import { useUrl } from "nextjs-current-url";
import { getClinic } from "./clinic_check";
import { RoleNum } from "../roles";
import assert from "assert";

/// get clinic ID in "client component",
/// if passed in role, it will check return uid if the role is Agc
/// otherwise check clinic id from url host
export const getCliId_Client=(role?:RoleNum,uid?:string):string|null=>{
    const hostName=useUrl()?.host;
    assert(role!==RoleNum.Agc||uid!==null,"please pass in agency's uid to getCliId_Client");
    if(role===RoleNum.Agc)return uid!;
    console.log(hostName);
    return getClinic(hostName);
}