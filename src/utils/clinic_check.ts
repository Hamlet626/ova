import {headers} from "next/headers";

export const getClinic=():string|null=>{
    const host=headers().get("host")??'';
    if(host==='')console.error("host key not working, check getClinic()");
    
    if(host.endsWith("3000"))return "test";
    return null;
}