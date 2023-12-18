import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { AlgoSetup } from "@/components/algolia/algo_setup";
import { MenuItemInfo } from "@/components/banner_menu/app_menu";
import { EDRcpAppBarMenu } from "@/components/banner_menu/ed_rcp";
import { RoleNum, roles } from "@/utils/roles";
import { getEDListsData } from "@/utils/server_data_getter/utils";
import { EggAlt, FavoriteBorderOutlined, TrendingUpOutlined, HandshakeOutlined, ListOutlined, SettingsOutlined, PlaylistPlay, HomeOutlined } from "@mui/icons-material";
import { getServerSession } from "next-auth";
import { ReactNode, Suspense } from "react";


export default async function EDLayout({children, params}: { children: ReactNode, params: { agcid: string } }) {
    return(
        <Suspense fallback={<EDRcpAppBarMenu role={RoleNum.Rcp} routesInfo={rcpBasicRoutes()}>
            {children}
            </EDRcpAppBarMenu>}>
            <RcpEDListsItems>
                {children}
            </RcpEDListsItems>
        </Suspense>
    )
}

const rcpBasicRoutes=():MenuItemInfo[]=>[
    {path:'dashboard',text:'Home','icon':<HomeOutlined/>},
    {path:'eds',text:'Egg Donors','icon':<EggAlt/>},
  {path:'lists/like',text:'Liked','icon':<FavoriteBorderOutlined/>},
  {path:'trending',text:'Trending','icon':<TrendingUpOutlined/>},
  {path:'cases',text:'Cases','icon':<HandshakeOutlined/>},
  {path:'lists',text:'Custom Lists','icon':<ListOutlined/>},
  {path:'setting',text:'Setting','icon':<SettingsOutlined/>},
  ]
  .map((v)=>({...v,path:(`/${roles[RoleNum.Rcp].path}/${v.path}`)}));


const RcpEDListsItems=async({children}:{children: ReactNode})=>{
    const rcp=await getServerSession(authOptions);
    const edListsDoc=(await getEDListsData(rcp?.user?.id!)).filter(v=>v.id!=='like');
    const routes=rcpBasicRoutes();
    routes[5].sub=edListsDoc.map(v=>({path:`/${roles[RoleNum.Rcp].path}/lists/${v.id}`,text:v.name,icon:<PlaylistPlay/>}));

    return <EDRcpAppBarMenu role={RoleNum.Rcp} routesInfo={routes}>
        {children}
        <Suspense fallback={null}>
        <AlgoSetup uid={rcp?.user?.id}/>
      </Suspense>
    </EDRcpAppBarMenu>
}