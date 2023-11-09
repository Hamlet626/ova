import { fieldFinished, removeUndefined } from "./internal";
import { FormField, FormSection, FormTemp, HeightValue } from "../types";


export const formStatus=(data:any, f:FormTemp):{time:string,finished:number,all:number}=>{
    data??={};
    const finished=Object.keys(data).length;
    const remained=f.content.reduce((v,ent)=>v+ent.fields.filter(v=>v.required&&data[v.id!]==null).length,0);
    const all=f.content.reduce((v,ent)=>v+ent.fields.length,0);
    return {time:`${remained*0.16} min`,finished,all};
}

export const secFinished=(data:any, sec:FormSection)=>sec.fields.every(v=>fieldFinished(data,v));

export const formFinished=(data:any, temp:FormTemp)=>temp.content.every(v=>secFinished(data,v));
