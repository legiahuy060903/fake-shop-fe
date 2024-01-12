
import { JWT } from "next-auth/jwt";
import NextAuth, { DefaultSession } from "next-auth"
declare module "next-auth/jwt" {
    interface JWT {
        user: IUser,
        access_token: string,
        refreshToken: string,
        expires: number,
    }
}
declare module "next-auth" {
    interface Session {
        user: IUser,
        access_token: string,
        refreshToken: string,
        expires: number,
    }
}