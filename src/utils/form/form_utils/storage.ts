import { removeUndefined } from "./internal";

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
    JSON.stringify([...(storedData.algoRemove??[]),...(algoRemove??[])]));
}

export const clearStoredForm=(formid:number)=>{
    localStorage.removeItem(`form${formid}`);
    localStorage.removeItem(`formAlgo${formid}`);
}

export const getFormKey=(fdid?:string|string[]):string|undefined=>{
    if(fdid==null)return;
    return (typeof fdid === 'string')?fdid:subFieldKey(...fdid as string[]);
}

export const subFieldKey=(...keys:string[]):string=>keys.join('-');
