import { EDRcpAppBarMenu } from "@/components/banner_menu/ed_rcp";
import { RoleNum, roles } from "@/utils/roles";
import { StickyNote2Outlined, FolderOutlined, PeopleOutline, HandshakeOutlined, CalendarMonthOutlined, SettingsOutlined, HomeOutlined } from "@mui/icons-material";


export default async function EDLayout({children, params}: { children: React.ReactNode, params: { agcid: string } }) {
    return(
        <EDRcpAppBarMenu role={RoleNum.ED} routesInfo={edRoutes(params.agcid)}>
            {children}
        </EDRcpAppBarMenu>
    )
}

const edRoutes=(agcid:string)=>[
    {path:'/dashboard',text:'Home','icon':<HomeOutlined/>},
    {path:'/forms',text:'Forms','icon':<StickyNote2Outlined/>},
  {path:'/files',text:'Files','icon':<FolderOutlined/>},
//   {path:'/agencies',text:'Agencies','icon':<PeopleOutline/>},
  {path:'/cases',text:'Cases','icon':<HandshakeOutlined/>},
  {path:'/calendar',text:'Events Calendar','icon':<CalendarMonthOutlined/>},
  {path:'/setting',text:'Setting','icon':<SettingsOutlined/>},
  ]
  ///for EDs, add ..agcid to the path, e.g. /forms -> /ed/agcid/forms
  .map((v)=>({...v,path:(`/${roles[RoleNum.ED].path}${agcid==null?'':`/${agcid}`}${v.path}`)}));