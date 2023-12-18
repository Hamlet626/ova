import { useEffect } from "react";
import { FieldValues, UseFormProps, UseFormReturn, useForm } from "react-hook-form";


type useFormType=<TFieldValues extends FieldValues = FieldValues, TContext = any, TTransformedValues extends FieldValues | undefined = undefined>(props?: UseFormProps<TFieldValues, TContext>)=> UseFormReturn<TFieldValues, TContext, TTransformedValues>;
export const useResettableForm:useFormType=(props)=>{
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

