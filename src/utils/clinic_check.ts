import {headers} from "next/headers";

export const getClinic=()=>{
    const host=headers().get("host");
    if(host.endsWith("3000"))return "test";
    return null;
}