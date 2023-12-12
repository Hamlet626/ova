import { useEffect, useRef } from "react";


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