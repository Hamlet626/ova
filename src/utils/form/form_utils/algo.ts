import { FormField } from "../types";

export const getField=(fs:FormField[],...fdids:string[]):FormField=>{
    const field=fs.find(v=>v.id===fdids[0]);
    if(field==null)throw `couldn't find field from sec/subs...${fs.length}, by fdids:${fdids}`;
    if(fdids.length===1)return field;
    if(field.sub==null)throw `no sub-field in field ${JSON.stringify(field)} (remained fdids:${fdids.slice(1)})`;
    return getField(field.sub!,...fdids.slice(1));
}

