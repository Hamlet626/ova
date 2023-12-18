'use client'
import { RoleNum } from "@/utils/roles";
import FilesPage, { FilesInfoContext } from "../../../../../_shared/_file_page/files"

export default function Files({params}:{params: { edid: string }}){
    return <FilesInfoContext.Provider value={{
        pageView:false,
        user:{role:RoleNum.ED,id:params.edid}}}>
        <FilesPage/>
        </FilesInfoContext.Provider>;
}