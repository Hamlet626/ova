import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import cloudinary from "@/utils/cloudinary/cloudinary";


///operations to cloudinary sdk, requires user to signin.
export async function POST(request: Request) {

    const user=(await getServerSession(authOptions))?.user;
    if(!user?.id)return Response.json({error:`User nor signed in'`},{status:501});

    const {l1key,l2key,body}=await request.json();

    const getFunc = <T extends keyof typeof cloudinary>(l1key: T, l2key?: keyof typeof cloudinary[T]) => {
        return l2key==null?cloudinary[l1key]:cloudinary[l1key][l2key];
      };

    const func=getFunc(l1key,l2key);
    const r=await func.apply(func,body);

    return Response.json(r);
}
