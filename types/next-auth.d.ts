import {AddiUser} from "./interfaces";
import {DefaultSession, DefaultUser} from "next-auth";
import {DefaultJWT} from "next-auth/jwt";

declare module "next-auth"{

    interface Session extends DefaultSession{
        user?: DefaultSession['user'] & AddiUser;
    }

    interface User extends DefaultUser,AddiUser{
    }
}

declare module "next-auth/jwt"{
    interface JWT extends DefaultJWT,AddiUser {}
}