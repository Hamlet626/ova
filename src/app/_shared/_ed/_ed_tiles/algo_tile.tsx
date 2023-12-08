'use client'
import { click_ED_event } from "@/utils/algolia";
import { getCliId_Client } from "@/utils/clinic_id/client";
import { UserRef, UsersAgcDataRef } from "@/utils/firebase/firebase_client";
import { RoleNum } from "@/utils/roles";
import { getDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import usePromise from "react-use-promise";
import { LoadingEDTile } from "./loading_tile";
import type { Hit } from 'instantsearch.js';
import { SendEventForHits } from "instantsearch.js/es/lib/utils";

export const EdAlgoTile=({hit,sendEvent}:{hit:Hit,sendEvent?:SendEventForHits})=>{
  
    const user=useSession({required:true}).data?.user;
    const agcId=getCliId_Client(user?.role,user?.id)!;
    const [basicInfo,infoError,infoState]=usePromise(
      ()=>getDoc(UserRef(RoleNum.ED,hit.objectID)),
      [hit.objectID]);
    const [agcData,agcError,agcState]=usePromise(
      ()=>{ 
        if(!agcId)return Promise.resolve(null);
        return getDoc(UsersAgcDataRef(RoleNum.ED,hit.objectID,agcId));
    },
      [hit.objectID,agcId]);
      const router=useRouter();
  
      return <LoadingEDTile 
      avatar={infoState==='pending'?undefined:basicInfo?.data()?.avatar}
      name={hit.name}
      tags={hit.tags??[]}
      price={agcState==='pending'?undefined:agcData?.data()?.price??null}
      onClick={(event)=>{
        event.stopPropagation();
        if (user?.role!==RoleNum.Agc&&sendEvent!=null) {
          sendEvent('click',hit,click_ED_event);
        }
        router.push(`/agc/ed/${hit.objectID}`);
      }}
      />
      
    }