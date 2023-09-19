import {redirect} from "next/navigation";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {RoleNum} from "@/utils/roles";
import { getClinic } from "@/utils/clinic_check";
import { headers } from "next/headers";

export default async function UnAuthLayout({children,}) {
    const session = await getServerSession(authOptions);

    if(!!session){
        // return redirect("/dashboard/agc");
        ///todo: remove the line above to execute below, after dashboard/xx is done
        if(session.user?.role==RoleNum.Agc)
            redirect("agc/dashboard");
        if(session.user?.role==RoleNum.ED)
            redirect(`ed/${getClinic(headers().get("host"))??session!.user.agencies![0]}/dashboard`);
        if(session.user?.role==RoleNum.Rcp)
            redirect("rcp/dashboard");
        else throw {message:"couldn't find user's role.", logout:true};
        return;
    }

    return (
        <section>
            {children}
        </section>
    )
}