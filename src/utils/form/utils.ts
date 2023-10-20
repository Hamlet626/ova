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

export type FormStoredData={data:any,algoRemove:string[]};

export const getStoredForm=(formid:number):FormStoredData|null=>{
    const storedData=localStorage.getItem(`form${formid}`);
    if(storedData==null)return storedData;
    const js = JSON.parse(storedData);
    js.data??={};
    js.algoRemove??=[];
    return js;
}

export const addStoredForm=(formid:number,{data,algoRemove}:{data?:any,algoRemove?:string[]})=>{
    const storedData=getStoredForm(formid);
    if(storedData==null)return localStorage.setItem(`form${formid}`,JSON.stringify({data,algoRemove}));
    return localStorage.setItem(`form${formid}`,JSON.stringify(
        {
            data:removeUndefined({...(storedData.data??{}),...(data??{})}),
            algoRemove:removeUndefined({...(storedData.algoRemove??{}),...(algoRemove??{})}),
        }));
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