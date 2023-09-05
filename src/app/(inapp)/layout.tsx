import {redirect} from "next/navigation";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export default async function InAppLayout({children,}) {
    const session = await getServerSession(authOptions);

    if(!session)redirect("/");

    return (
        <section>
            {/* Include shared UI here e.g. a header or sidebar */}
            {/*<nav></nav>*/}

            {children}
        </section>
    )
}