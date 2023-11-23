import { useEffect, useRef, useState } from "react";
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


export const useLastestValue=(value:any) => {
    const prevValue = useRef();
  
    useEffect(() => {
      // Update the previous value when the current value changes
      if(value!=null)
      prevValue.current = value;
    }, [value]);
  
    // Return the previous value
    return value??prevValue.current;
  }

