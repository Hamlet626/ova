import {redirect} from "next/navigation";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {LogoutButton} from "@/components/logout_button";
import { RoleNum } from "@/utils/roles";
import { AuthSessionProvider } from "@/components/auth_session_provider";

export default async function InAppLayout({children}: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);

    if(!session)return redirect("/");
    if(![RoleNum.ED,RoleNum.Rcp,RoleNum.Agc].includes(session.user.role))
        throw {message:"couldn't find user's role.", logout:true};

    return (
        <AuthSessionProvider>
        <section>
            {/* Include shared UI here e.g. a header or sidebar */}
            {/*<nav></nav>*/}
            <LogoutButton/>
            {children}
        </section>
        </AuthSessionProvider>
    )
}