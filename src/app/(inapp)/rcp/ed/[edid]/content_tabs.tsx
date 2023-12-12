'use client'
import { OVA_very_soft_grey, tab_divider } from "@/components/ThemeRegistry/theme_consts"
import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import TabPanel from "@mui/lab/TabPanel"
import { Box, Tab } from "@mui/material"
import { redirect, usePathname, useRouter, useSelectedLayoutSegment } from "next/navigation"
import { ReactNode } from "react"

export const EDViewerContentTabs=({children,edid}:{children:ReactNode,edid:string})=>{
    const route=useSelectedLayoutSegment()??'';
    const router=useRouter();
    return <TabContext value={route}>
        <Box bgcolor={OVA_very_soft_grey} borderBottom={`solid ${tab_divider}`}>
          <TabList centered indicatorColor="primary"
          onChange={(ev,r)=>router.replace(`/rcp/ed/${edid}/${r}`)}>
            <Tab label="Overview" value="" />
            <Tab label="Forms" value="forms" />
            <Tab label="Files" value="files" />
            <Tab label="Appointments" value="appointments" />
          </TabList>
        </Box>
        {children}
    </TabContext>;
}