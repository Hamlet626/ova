import { useEffect, useRef, useState } from "react";
import { FieldValues, UseFormProps, UseFormReturn, useForm } from "react-hook-form";
import usePromise from "react-use-promise";

export const useLocalCachePromise=<T=any>(promise:Promise<T> | (() => Promise<T>),deps:any[]=[],defaultValue?:T,)=>{
    const [data,setData]=useState<T|undefined>(defaultValue);
    
    const [pm,error,status]=usePromise(async()=>{
      if(typeof promise === 'function'){
        await promise().then(v=>setData(v));
      }else await promise.then(v=>setData(v));
    },deps);
  
    return {data,setData,error,status};
  }


export const useLastestValue=<T extends any>(value?:T) => {
    const prevValue = useRef<T>();
  
    useEffect(() => {
      // Update the previous value when the current value changes
      if(value!=null)
      prevValue.current = value;
    }, [value]);
  
    // Return the previous value
    return value??prevValue.current;
  }

  

type useFormType=<TFieldValues extends FieldValues = FieldValues, TContext = any, TTransformedValues extends FieldValues | undefined = undefined>(props?: UseFormProps<TFieldValues, TContext>)=> UseFormReturn<TFieldValues, TContext, TTransformedValues>;
export const useConsistForm:useFormType=(props)=>{
  const r=useForm({...props,shouldUnregister:true});
  
  const deterministicReplacer = (_: any, v: any) =>
  typeof v !== 'object' || v === null || Array.isArray(v) ? v :
    Object.fromEntries(Object.entries(v).sort(([ka], [kb]) => 
      ka < kb ? -1 : ka > kb ? 1 : 0));

  useEffect(()=>{
    if(props?.defaultValues!=null)r.reset(props?.defaultValues as any);
    else{ 
      const v=r.getValues();
      r.reset(Object.fromEntries(Object.entries(v).map(v=>[v[0],null])) as any);
    }
  },[JSON.stringify(props?.defaultValues,deterministicReplacer,2)]);

  return r as any;
}
