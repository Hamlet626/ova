import { EDRcpAppBarMenu } from "@/components/layouts/ed_rcp";
import { RoleNum } from "@/utils/roles";


export default async function EDLayout({children, params}: { children: React.ReactNode, params: { agcid: string } }) {
    console.log(params);
    return(
        <EDRcpAppBarMenu role={RoleNum.Rcp}>
            {children}
        </EDRcpAppBarMenu>
    )
}