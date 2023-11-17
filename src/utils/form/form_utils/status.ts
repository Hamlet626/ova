import { fieldFinished, removeUndefined } from "./internal";
import { FormField, FormSection, FormTemp, HeightValue } from "../types";

export type FormTempStatus={
    time:string,finished:number,all:number
}
export type FormTempStatusCpx={
    title:string,
    index:number,
    stats:FormTempStatus,
    subs:{
        finished:string[],
        remained:string[]
    }
}

export const formStatus=(data:any, f:FormTemp):FormTempStatus=>{
    data??={};
    const finished=Object.keys(data).length;
    const remained=f.content.reduce((v,ent)=>v+ent.fields.filter(v=>v.required&&data[v.id!]==null).length,0);
    const all=f.content.reduce((v,ent)=>v+ent.fields.length,0);
    return {time:`${remained*0.16} min`,finished,all};
}

export const secFinished=(data:any, sec:FormSection):boolean=>sec.fields.every(v=>fieldFinished(data,v));

export const formFinished=(data:any, temp:FormTemp):boolean=>temp.content.every(v=>secFinished(data,v));

export const getFinishStatus=(template:FormTemp[],data:any[]):FormTempStatusCpx[]=>{
    return template.map((v,i)=>({
        title:v.name,index:i,
        stats:formStatus(data[i],v),
        subs:{
            finished:v.content.filter(v=>secFinished(data[i],v)).map(v=>v.title),
            remained:v.content.filter(v=>!secFinished(data[i],v)).map(v=>v.title)
        }}
    ));
}