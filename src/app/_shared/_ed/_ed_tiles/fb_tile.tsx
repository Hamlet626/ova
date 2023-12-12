'use client'
import { algo_client, EDRec, click_ED_event } from "@/utils/algolia";
import { getCliId_Client } from "@/utils/clinic_id/client";
import { UserRef, UsersAgcDataRef } from "@/utils/firebase/firebase_client";
import { roles, RoleNum } from "@/utils/roles";
import { getDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import usePromise from "react-use-promise";
import aa from "search-insights";
import { LoadingEDTile } from "./loading_tile";
import { Box } from "@mui/material";
import { AppLayoutContext } from "@/components/banner_menu/ed_rcp";
import useWindowDimensions from "@/utils/hooks/use_window_dimensions";
import { useContext } from "react";
import { calcEDTileWidth } from "../_eds_blocks/consts";

export const EdFbTile=({edid,constraint,transparent=false}:{edid:string,transparent?:boolean,
  constraint?:{space?:number,padding:number,transparent?:boolean}})=>{
    const user=useSession({required:true}).data?.user;
    const agcId=getCliId_Client(user?.role,user?.id)!;
  
    const [algoInfo,algoError,algoState]=usePromise(
      ()=>algo_client.initIndex(roles[RoleNum.ED].id).getObject<EDRec>(edid),
      [edid]);
    const [basicInfo,infoError,infoState]=usePromise(
        ()=>getDoc(UserRef(RoleNum.ED,edid)),
        [edid]);
    
      const [agcData,agcError,agcState]=usePromise(
        ()=>{ 
          if(!agcId)return Promise.resolve(null);
          return getDoc(UsersAgcDataRef(RoleNum.ED,edid,agcId));
      },
        [edid,agcId]);
        const router=useRouter();

        const {width}=useWindowDimensions();
    const {menuWidth}=useContext(AppLayoutContext)!;
  
        const tile = <LoadingEDTile transparent={transparent}
        avatar={infoState==='pending'?undefined:basicInfo?.data()?.avatar}
        name={infoState==='pending'?undefined:basicInfo?.data()?.name}
        tags={algoState==='pending'?undefined:algoInfo?.tags}
        price={agcState==='pending'?undefined:agcData?.data()?.price}
        onClick={(event)=>{
          event.stopPropagation();
          aa('clickedObjectIDs', {index:roles[RoleNum.ED].id,
            eventName:click_ED_event,objectIDs:[edid]});
          router.push(`/${roles[user!.role].path}/ed/${edid}`);
        }}
        />;

        return constraint==null?tile:
        <Box maxWidth={calcEDTileWidth(width-menuWidth-constraint.padding,constraint.space)}>{tile}</Box>
  }