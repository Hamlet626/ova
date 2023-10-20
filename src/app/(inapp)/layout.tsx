import {redirect} from "next/navigation";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {LogoutButton} from "@/components/logout_button";
import { RoleNum } from "@/utils/roles";
import { AuthSessionProvider } from "@/components/auth_session_provider";
import { Suspense } from "react";
import { NavigationEvents } from "@/components/navigation_events/navigation_events";

export default async function InAppLayout({children}: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);

    if(!session)return redirect("/");
    if(![RoleNum.ED,RoleNum.Rcp,RoleNum.Agc].includes(session.user.role))
        throw {message:"couldn't find user's role.", logout:true};

    return (
        <AuthSessionProvider>
        <section>
            {children}
        </section>

      <Suspense fallback={null}>
                <NavigationEvents />
            </Suspense>
        </AuthSessionProvider>
    )
}