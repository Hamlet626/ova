'use client'
 
import { useEffect, useRef, useState } from 'react'
import { ReadonlyURLSearchParams, usePathname, useSearchParams } from 'next/navigation'
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { app } from '@/utils/firebase/firebase_client';
import { useSession } from 'next-auth/react';
import { roles } from '@/utils/roles';
import { algo_client } from '@/utils/algolia';
import { AlgoTemplates } from '@/utils/form/template';
import { EDRec } from '@/utils/algolia';
import { FormStoredData, clearStoredForm, getStoredForm, subFieldKey } from '@/utils/form/utils';
import { FormDataDoc } from '@/utils/firebase/database_consts';
 
const edFormPath: RegExp = /^\/ed\/[^/]+\/forms\/detail\/\d+$/;
const rcpFormPath: RegExp = /^\/rcp\/forms\/detail\/\d+$/;

export function NavigationEvents() {
  const user=useSession().data?.user;
  const prePath=useRef<string|undefined>();
  const preParam=useRef<ReadonlyURLSearchParams|undefined>();

  const pathname = usePathname()
  const searchParams = useSearchParams()
 
  useEffect(() => {
    const url = `${pathname}?${searchParams}`
    // You can now use the current URL
    // ...
    
    if(user!=null&&(prePath.current?.match(edFormPath)||prePath.current?.match(rcpFormPath))){
      const pathseg=prePath.current.split('/');
      const formid=Number(pathseg[pathseg.length-1]);
      const storedData=getStoredForm(formid);

      if(Object.keys(storedData.data).length>0){
        
        // console.log("form saved",roles[user.role].id,user.id,JSON.parse(storedData));
        // console.log(storedData);
        setDoc(
          doc(getFirestore(app),FormDataDoc(user.role,user.id,formid)),
          storedData.data,{merge:true});
          
          updateAlgo(roles[user.role].id,formid,user.id,storedData);

          clearStoredForm(formid);
      }
    }

    prePath.current=pathname;
    preParam.current=searchParams;
  }, [pathname, searchParams]);
 
  return null;
}

const updateAlgo=async(roleID: string,formid: number,uid: string,data: FormStoredData)=>{
  const user=await algo_client.initIndex(roleID).getObject<EDRec>(uid);
  const algoData:any={objectID:uid,tags:new Set(user.tags??[])};
  
  data.algoRemove?.forEach(v=>{algoData.tags.delete(v);});
  AlgoTemplates[formid].forEach((v)=>{
    if(v.tag){
      if(typeof v.fdid === 'string'){
        if(data.data[v.fdid]!==undefined) algoData.tags.add(data.data[v.fdid]);
      }else{ 
        const value=data.data[subFieldKey(...v.fdid as string[])];
        algoData.tags.add(value);
      }
    }
    if(v.filter??true){
      if(typeof v.fdid === 'string'){
        if(data.data[v.fdid]!==undefined) algoData[v.label!]=data.data[v.fdid];
      }else{
        const value=data.data[subFieldKey(...v.fdid as string[])];
        algoData[v.label!]=value;
      }
    }
  })
  algoData.tags=Array.from(algoData.tags);
  
  algo_client.initIndex(roleID).partialUpdateObject(algoData);
}