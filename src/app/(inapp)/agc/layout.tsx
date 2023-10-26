import { AGCAppBar } from "@/components/layouts/agc";


export default async function AGCLayout({children}: { children: React.ReactNode}) {
    return(
        <AGCAppBar>
            {children}
        </AGCAppBar>
    )
}