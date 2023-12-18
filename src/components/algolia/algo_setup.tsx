'use client'
import { useEffect } from "react";
import aa from "search-insights";

export const AlgoSetup=({uid}:{uid?:string})=>{
    // const uToken=aa('getUserToken', {}, (err, userToken) => {
    //     if (err) {
    //       console.error(err);
    //       return;
    //     }
    //     console.log(userToken);
    //   });
    useEffect(()=>{
      aa('init', { appId:'4WJ9FHOG84', apiKey:'92bb7bfcde71a02e96721c077a0b491c', 
                useCookie:true, partial: true,anonymousUserToken:uid==null,authenticatedUserToken:uid});
        if(uid==null)
        aa('getUserToken', {}, (err, userToken) => {
            if (err) {
              console.error("err");
              console.error(err);
              return;
            }
            if(!userToken){
                aa('init', { appId:'4WJ9FHOG84', apiKey:'92bb7bfcde71a02e96721c077a0b491c', 
                useCookie:true, partial: true,anonymousUserToken:true});
            }
            // console.log("userToken",userToken);
          });
        
        // aa('setUserToken', yourUserToken);
    },[]);
    return null;
} 