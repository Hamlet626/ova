import { FormField, FormSection, FormTemp } from "./template";

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
