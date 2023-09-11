import {redirect} from "next/navigation";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {RoleNum} from "@/utils/roles";

export default async function UnAuthLayout({children,}) {
    const session = await getServerSession(authOptions);

    if(!!session){
        return redirect("/dashboard/agc");
        ///todo: remove the line above to execute below, after dashboard/xx is done
        if(session.user.role==RoleNum.Agc)
            redirect("/dashboard/agc");
        if(session.user.role==RoleNum.ED)
            redirect("/dashboard/ed");
        if(session.user.role==RoleNum.Rcp)
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