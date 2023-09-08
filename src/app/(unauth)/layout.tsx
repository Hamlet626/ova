import {redirect} from "next/navigation";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {AgcRoleNum, EDRoleNum, RcpRoleNum} from "@/utils/roles";

export default async function UnAuthLayout({children,}) {
    const session = await getServerSession(authOptions);

    if(!!session){
        return redirect("/dashboard/agc");
        ///todo: remove the line above to execute below, after dashboard/xx is done
        if(session.user.role==AgcRoleNum)
            redirect("/dashboard/agc");
        if(session.user.role==EDRoleNum)
            redirect("/dashboard/ed");
        if(session.user.role==RcpRoleNum)
            redirect("/dashboard/rcp");
        else throw {message:"couldn't find user's role.", logout:true};
        return;
    }

    return (
        <section>
            {/* Include shared UI here e.g. a header or sidebar */}
            {/*<nav></nav>*/}
            {children}
        </section>
    )
}