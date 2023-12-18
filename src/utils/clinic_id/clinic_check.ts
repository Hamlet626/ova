import { getServerSession } from "next-auth";
import { useSearchParams } from "next/navigation";

export const getClinic=(host?:string|null):string|null=>{
    host??='';
    if(host==='')console.error("host key not working, check getClinic()");
    
    if(host.endsWith("3000"))return "RhWjYhUPy0TaL1mTBe2HEwGaBBv1";
    return null;
}

export const cliCurClinic=async(agencies?:string[]):Promise<string>=>{
    if(getClinic()!=null)return getClinic()!;
    const agcParam=useSearchParams().get('agc');
    if(agcParam!=null)return agcParam;
    return (agencies??(await getServerSession())?.user?.agencies)![0]!;
}