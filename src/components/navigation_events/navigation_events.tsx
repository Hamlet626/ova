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
import { FormStoredData, getNestedKeys, getStoredForm } from '@/utils/form/utils';
 
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
      const formid=pathseg[pathseg.length-1];
      const storedData=getStoredForm(Number(formid));

      if(storedData!=null && Object.keys(storedData.data).length>0){
        
        // console.log("form saved",roles[user.role].id,user.id,JSON.parse(storedData));
        // console.log(storedData);
        setDoc(
          doc(getFirestore(app),`user groups/${roles[user.role].id}/users/${user.id}/form data/${formid}`),
          storedData.data,{merge:true});
          
          updateAlgo(roles[user.role].id,formid,user.id,storedData);

        localStorage.removeItem(`form${formid}`);
      }
    }

    prePath.current=pathname;
    preParam.current=searchParams;
  }, [pathname, searchParams]);
 
  return null;
}

const updateAlgo=async(roleID: string,formid: string,uid: string,data: FormStoredData)=>{
  const user=await algo_client.initIndex(roleID).getObject<EDRec>(uid);
  user.tags
  const algoData:any={tags:new Set(user.tags)};
  
  data.algoRemove?.forEach(v=>{algoData.tags.delete(v);});
  AlgoTemplates[Number(formid)].forEach((v)=>{
    if(v.tag){
      if(typeof v.fdid === 'string'){
        if(data.data[v.fdid]!==undefined) algoData.tags.push(data.data[v.fdid]);
      }else{ 
        const value=getNestedKeys(data.data,v.fdid as string[]);
        algoData.tags.push(value);
      }
    }
    if(v.filter){
      if(typeof v.fdid === 'string'){
        if(data.data[v.fdid]!==undefined) algoData[v.label!]=data.data[v.fdid];
      }else{ 
        const value=getNestedKeys(data.data,v.fdid as string[]);
        algoData[v.label!]=value;
      }
    }
  })
  algoData.tags=Array.from(algoData.tags);

  algo_client.initIndex(roleID).partialUpdateObject(algoData);
}