import { EDRcpAppBarMenu } from "@/components/layouts/ed_rcp";
import { RoleNum } from "@/utils/roles";


export default async function EDLayout({children}: { children: React.ReactNode }) {
    return(
        <EDRcpAppBarMenu role={RoleNum.ED}>
            {children}
        </EDRcpAppBarMenu>
    )
}