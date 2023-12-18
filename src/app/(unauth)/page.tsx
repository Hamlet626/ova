
import Link from "next/link";

export default async function LandingPage() {

  return (
      // <main className="flex min-h-screen flex-col items-center justify-between p-24">
      // </main>
      <div className="p-8">
        <Link href={"/signin"}>sign in</Link>
      </div>
  )
}
