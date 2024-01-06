import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
    interface JWT {
        user: IUser,
        access_token: string,
        refreshToken: string,
    }
}
declare module "next-auth" {
    interface Session {
        user: IUser,
        access_token: string,
        refreshToken: string,
    }
}