'use client'
import { click_ED_event } from "@/utils/algolia";
import { getCliId_Client } from "@/utils/clinic_id/client";
import { UserRef, UsersAgcDataRef } from "@/utils/firebase/firebase_client";
import { RoleNum, roles } from "@/utils/roles";
import { getDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import usePromise from "react-use-promise";
import { LoadingEDTile } from "./loading_tile";
import type { Hit } from 'instantsearch.js';
import { SendEventForHits } from "instantsearch.js/es/lib/utils";
import { getUserAgcFbData_client, getUserBasicFbData_client } from "@/utils/server_data_getter/client_getter";
import aa from "search-insights";

export const EdAlgoTile=({hit,sendEvent,transparent=false,constraint}:{hit:Hit,sendEvent?:SendEventForHits|boolean,transparent?:boolean,constraint?:{space?:number,padding:number}})=>{
  
    const user=useSession({required:true}).data?.user;
    const agcId=getCliId_Client(user?.role,user?.id)!;
    const [basicInfo,infoError,infoState]=usePromise(
      ()=>getUserBasicFbData_client(RoleNum.ED,hit.objectID),
      [hit.objectID]);
    const [agcData,agcError,agcState]=usePromise(
      ()=>{
        if(!agcId)return Promise.resolve(null);
        return getUserAgcFbData_client(RoleNum.ED,hit.objectID,agcId);
    },
      [hit.objectID,agcId]);
      const router=useRouter();
  
    //   const {width}=useWindowDimensions();
    // const {menuWidth}=useContext(AppLayoutContext)!;
    
      const tile = <LoadingEDTile transparent={transparent}
      avatar={infoState==='pending'?undefined:basicInfo?.avatar}
      name={hit.name}
      tags={hit.tags??[]}
      price={agcState==='pending'?undefined:agcData?.price??null}
      onClick={(event)=>{
        event.stopPropagation();
        if (user?.role!==RoleNum.Agc&&(typeof sendEvent==='function'||sendEvent)) {
          if(sendEvent===true)aa('clickedObjectIDs',{eventName:click_ED_event,
            index:roles[RoleNum.ED].id,objectIDs:[hit.objectID]});
          else sendEvent('click',hit,click_ED_event);
        }
        router.push(`/${roles[user!.role].path}/ed/${hit.objectID}`);
      }}
      />
      
      return( //constraint!=null? <Box maxWidth={calcEDTileWidth(width-menuWidth-constraint.padding,constraint.space)}>{tile}</Box>:
      tile);
    }