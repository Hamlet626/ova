import { EDRcpAppBarMenu } from "@/components/layouts/ed_rcp";
import { RoleNum } from "@/utils/roles";


export default async function EDLayout({children, params}: { children: React.ReactNode, params: { agcid: string } }) {
    return(
        <EDRcpAppBarMenu role={RoleNum.ED} agcid={params.agcid}>
            {children}
        </EDRcpAppBarMenu>
    )
}