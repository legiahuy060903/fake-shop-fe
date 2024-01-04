import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET as string,
    providers: [
        // CredentialsProvider({
        //     // The name to display on the sign in form (e.g. "Sign in with...")
        //     name: "Credentials",
        //     // `credentials` is used to generate a form on the sign in page.
        //     // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        //     // e.g. domain, username, password, 2FA token, etc.
        //     // You can pass any HTML attribute to the <input> tag through the object.
        //     credentials: {
        //         username: { label: "Username", type: "text", placeholder: "hoidanit@gmail.com", userRole: "admin" },
        //         password: { label: "Password", type: "password", placeholder: "123456" }
        //     },
        //     async authorize(credentials, req) {
        //         // Add logic here to look up the user from the credentials supplied
        //         const user = { id: "1", name: "Hỏi Dân IT", email: "hoidanit@gmail.com", userRole: "admin" }

        //         if (user) {
        //             // Any object returned will be saved in `user` property of the JWT
        //             return user
        //         } else {
        //             // If you return null then an error will be displayed advising the user to check their details.
        //             return null

        //             // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        //         }
        //     }
        // }),

        // FacebookProvider({
        //     clientId: process.env.FACEBOOK_ID as string,
        //     clientSecret: process.env.FACEBOOK_SECRET as string
        // }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
    ],
    // callbacks: {
    //     async jwt({ token, account }) {
    //         return token;
    //     },
    // },
};