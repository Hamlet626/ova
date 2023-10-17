'use client'
 
import { useEffect, useRef, useState } from 'react'
import { ReadonlyURLSearchParams, usePathname, useSearchParams } from 'next/navigation'
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { app } from '@/utils/firebase/firebase_client';
import { useSession } from 'next-auth/react';
import { roles } from '@/utils/roles';
 
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
    console.log(url)
    // You can now use the current URL
    // ...
    
    if(user!=null&&(prePath.current?.match(edFormPath)||prePath.current?.match(rcpFormPath))){
      const pathseg=prePath.current.split('/');
      const formid=pathseg[pathseg.length-1];
      const storedData=localStorage.getItem(`form${formid}`);
      if(storedData!=null){
        
        console.log("form saved",roles[user.role].id,user.id,JSON.parse(storedData));
        // setDoc(doc(getFirestore(app),`user groups/${roles[user.role].id}/users/${user.id}/form data/${formid}`),JSON.parse(storedData),{merge:true});
        localStorage.removeItem(`form${formid}`);
      }
    }

    prePath.current=pathname;
    preParam.current=searchParams;
  }, [pathname, searchParams]);
 
  return null;
}