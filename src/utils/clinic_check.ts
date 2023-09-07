import {headers} from "next/headers";

export const getClinic=():string|null=>{
    const host=headers().get("host");
    if(host.endsWith("3000"))return "test";
    return null;
}