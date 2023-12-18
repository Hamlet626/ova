import { AGCAppBar } from "@/components/banner_menu/agc";


export default async function AGCLayout({children}: { children: React.ReactNode}) {
    return(
        <AGCAppBar>
            {children}
        </AGCAppBar>
    )
}