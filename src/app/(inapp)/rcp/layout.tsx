import { EDRcpAppBarMenu } from "@/components/banner_menu/ed_rcp";
import { RoleNum } from "@/utils/roles";


export default async function EDLayout({children, params}: { children: React.ReactNode, params: { agcid: string } }) {
    return(
        <EDRcpAppBarMenu role={RoleNum.Rcp}>
            {children}
        </EDRcpAppBarMenu>
    )
}