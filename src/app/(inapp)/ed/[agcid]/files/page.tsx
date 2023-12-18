'use client'
import FilesPage, { FilesInfoContext } from "@/app/_shared/_file_page/files";
import { useSession } from "next-auth/react";

export default function Files(){
    const me=useSession({required:true}).data?.user;
    return <FilesInfoContext.Provider value={{
        pageView:true,
        user:{role:me?.role!,id:me?.id!}}}>
        <FilesPage/>
        </FilesInfoContext.Provider>;
}