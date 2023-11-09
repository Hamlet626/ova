import { FormField, FormTemp, HeightValue } from "../types";

const makeFieldId=(id:string,prefix?:string)=>prefix==null?id:`${prefix}_${id}`;

export const fieldFinished=(data:any, f:FormField,idPrefix?:string):boolean=>{
    const thisId=makeFieldId(f.id!,idPrefix);
    return ((!f.required)||((data?.[thisId])!=null))&&
    (f.sub==null||f.sub.every(v=>fieldFinished(data,v,thisId)));
}


export const removeUndefined=(obj:any)=>Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined));



//not used currently, 
//  because we are flatting sub-fields into 1-D map, 
//  so no need to get objecst's nested keys
export const getNestedKeys=(obj:any,keys:string[])=>{
    keys.forEach(v=>{obj=obj[v];});
    return obj;
}




export const inch2cm=(h:HeightValue):number=>{
    if(h.iscm)return h.cm!;
    return (h.inch!.feet!*12+h.inch!.inch!)*2.54;
}