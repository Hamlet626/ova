import {redirect} from "next/navigation";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {LogoutButton} from "@/components/logout_button";
import { RoleNum } from "@/utils/roles";

export default async function InAppLayout({children,}) {
    const session = await getServerSession(authOptions);

    if(!session)return redirect("/");
    if(![RoleNum.ED,RoleNum.Rcp,RoleNum.Agc].includes(session.user.role))
        throw {message:"couldn't find user's role.", logout:true};

    return (
        <section>
            {/* Include shared UI here e.g. a header or sidebar */}
            {/*<nav></nav>*/}
            <LogoutButton/>
            {children}
        </section>
    )
}