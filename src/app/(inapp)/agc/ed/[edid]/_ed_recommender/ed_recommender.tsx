'use client'
import Box from '@mui/material/Box';
import {Avatar, Chip, ListItemIcon, ListItemText, MenuItem, Stack } from '@mui/material';
import { RcpRec } from '@/utils/algolia';
import { RoleNum } from '@/utils/roles';
import { Hit } from '@algolia/client-search';
import { HTMLAttributes, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Check } from '@mui/icons-material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { UserRef, UsersAgcDataRef, app } from '@/utils/firebase/firebase_client';
import { arrayRemove, arrayUnion, collectionGroup, getDoc, getDocs, getFirestore, query, setDoc, where } from 'firebase/firestore';
import { BasicInfoDoc } from '@/utils/firebase/types';
import UserSearcher from './user_searcher';
import { useLocalCachePromise } from '@/utils/server_data_getter/hooks';

export const EDRecommender=({edid}:{edid:string})=>{
    const myid=useSession({required:true}).data?.user?.id!;
    const [loading,setLoading]=useState(false);
    const {data,setData}=useLocalCachePromise<BasicInfoDoc[]>(async()=>{
      const r=await getDocs(query(collectionGroup(getFirestore(app),'agc data'),
      where('agcid','==',myid),where('recommends','array-contains',edid)));
      
      return Promise.all(
        r.docs.map(v=>getDoc(UserRef(RoleNum.Rcp,v.ref.parent.parent?.id!))
        .then(v=>({uid:v.id,...v.data()}as any)))
        );
    },[edid,myid]);


    return <Stack>
      <UserSearcher agcid={myid} role={RoleNum.Rcp} loading={loading}
      renderOption={(v: Hit<RcpRec>,props: HTMLAttributes<HTMLLIElement>)=> {
        const existed=data?.some((rcp)=>rcp.uid===v.objectID);
        return <MenuItem {...props} key={`${v.objectID}`} selected={existed}>
          <ListItemText>{v.name}</ListItemText>
          {existed&& <ListItemIcon><Check/></ListItemIcon>}
          </MenuItem>
        }}
        onChange={async(ev,v,reason,detail)=>{
          if(v!=null&&reason==="selectOption"){
            const existed=data?.some((rcp)=>rcp.uid===v.objectID);
            setLoading(true);
            const [newRcp]=await Promise.all([
              ...(existed?[]:[getDoc(UserRef(RoleNum.Rcp,v.objectID))]),
              setDoc(UsersAgcDataRef(RoleNum.Rcp,v.objectID,myid),
              {recommends:existed?arrayRemove(edid):arrayUnion(edid)},
              {merge:true})
            ]);
            setLoading(false);
            setData((d)=>existed?d?.filter((rcp)=>rcp.uid!==v.objectID):[
              {uid:newRcp!.id,...newRcp!.data()} as any,...d??[]]);
          }
        }}
        ACprops={{disableCloseOnSelect:true}}
        />
        <Box height={12}/>
        <Grid2 container>
          {(data??[]).map(v=><RcpChip data={v} onDelete={async()=>{
            await setDoc(UsersAgcDataRef(RoleNum.Rcp,v.uid,myid),
              {recommends:arrayRemove(edid)},
              {merge:true});
              setData((d)=>d?.filter((rcp)=>rcp.uid!==v.uid));
          }}/>)}
        </Grid2>
    </Stack>
}

const RcpChip=({data,onDelete}:{data:BasicInfoDoc,onDelete:Function})=>{
  const [removing,setRemoving]=useState(false);

  return <Chip label={data.name} disabled={removing} color='secondary'
  avatar={<Avatar alt={data.name} src={data.avatar}/>}
  onDelete={async (ev)=>{
    setRemoving(true);
    await onDelete();
    setRemoving(true);
  }}/>
}


