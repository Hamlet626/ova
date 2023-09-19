'use client'

import { AccountCircle } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { useSession } from "next-auth/react";

export const BannerAvatar=()=>{
    const { data: session, status } = useSession({required:true});
    return( session?.user?.image==null?
        <Avatar {...stringAvatar(session?.user?.name)}/>:
        <Avatar src={session?.user?.image}>
            <AccountCircle/>
          </Avatar>
    );
}


function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string|null|undefined) {
    name??='';
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: name.split(' ').length<2?<AccountCircle/>:`${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

