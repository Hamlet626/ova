'use client'
import { useEffect } from "react";
import aa from "search-insights";

export const AlgoSetup=({uid}:{uid?:string})=>{
    useEffect(()=>{
      aa('init', { appId:'4WJ9FHOG84', apiKey:'92bb7bfcde71a02e96721c077a0b491c', 
                useCookie:true, partial: true,anonymousUserToken:uid==null,
                ...uid==null?{}:{authenticatedUserToken:uid}
              });
                // console.log('uid',uid);
    },[uid]);
    return null;
} 