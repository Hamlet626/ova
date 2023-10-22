import { FormField, FormSection, FormTemp, HeightValue } from "./types";

const makeFieldId=(id:string,prefix?:string)=>prefix==null?id:`${prefix}_${id}`;

export const fieldFinished=(data:any, f:FormField,idPrefix?:string):boolean=>{
    const thisId=makeFieldId(f.id!,idPrefix);
    return ((!f.required)||((data?.[thisId])!=null))&&
    (f.sub==null||f.sub.every(v=>fieldFinished(data,v,thisId)));
}

export const formStatus=(data:any, f:FormTemp):{time:string,finished:number,all:number}=>{
    data??={};
    const finished=Object.keys(data).length;
    const remained=f.content.reduce((v,ent)=>v+ent.fields.filter(v=>v.required&&data[v.id!]==null).length,0);
    const all=f.content.reduce((v,ent)=>v+ent.fields.length,0);
    return {time:`${remained*0.16} min`,finished,all};
}

export const secFinished=(data:any, sec:FormSection)=>sec.fields.every(v=>fieldFinished(data,v));

export const formFinished=(data:any, temp:FormTemp)=>temp.content.every(v=>secFinished(data,v));

export type FormStoredData={data?:any,algoRemove?:string[]};

export const getStoredForm=(formid:number):FormStoredData=>{
    const formData=localStorage.getItem(`form${formid}`);
    const algoData=localStorage.getItem(`formAlgo${formid}`);
    const data=JSON.parse(formData??'{}');
    const algoRemove=JSON.parse(algoData??'[]');
    return {data,algoRemove};
}

export const addStoredForm=(formid:number,{data,algoRemove}:FormStoredData)=>{
    const storedData=getStoredForm(formid);
    
    localStorage.setItem(`form${formid}`,
    JSON.stringify(removeUndefined({...(storedData.data??{}),...(data??{})})));

    localStorage.setItem(`formAlgo${formid}`,
    JSON.stringify(removeUndefined({...(storedData.algoRemove??[]),...(algoRemove??[])})));
}

export const removeUndefined=(obj:any)=>Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined));

export const getNestedKeys=(obj:any,keys:string[])=>{
    keys.forEach(v=>{obj=obj[v];});
    return obj;
}

export const inch2cm=(h:HeightValue):number=>{
    if(h.iscm)return h.cm!;
    return (h.inch!.feet!*12+h.inch!.inch!)*2.54;
}