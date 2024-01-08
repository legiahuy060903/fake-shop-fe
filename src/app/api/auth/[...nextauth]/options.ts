import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from "next-auth/providers/credentials";
import { sendRequest } from '@/hooks/sendRequest';
import { url } from '@/utils/const';
import { JWT } from 'next-auth/jwt';

async function refreshAccessToken(refreshToken: string) {
    const { data, success, message } = await sendRequest<IBackendRes<JWT>>({ url: `${url}auth/refresh`, body: { refreshToken }, method: "POST" });
    if (success) return data as any;
    else throw new Error(message)
}

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET as string,
    providers: [
        CredentialsProvider({
            name: "Fake Book",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const res = await sendRequest<IBackendRes<JWT>>({
                    url: `${url}auth/login`, method: "POST",
                    body: { username: credentials?.username, password: credentials?.password }
                })

                if (res && res.data) return res.data as any;
                else throw new Error(res.message)
            }
        }),

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
    callbacks: {
        async jwt({ token, user, account, profile, trigger, session }) {
            if (trigger === "signIn" && account?.provider !== "credentials") {
                const { data } = await sendRequest<IBackendRes<JWT>>({
                    url: `${url}auth/login-social`,
                    method: "POST",
                    body: { email: user.email, username: user.name, type: account?.provider }
                })
                if (data) token = data;
                return token
            }
            if (trigger === "signIn" && account?.provider === "credentials") {
                if (user) token = user as unknown as JWT
            }
            if (Date.now() > +token.expires) {
                return await refreshAccessToken(token.refreshToken)
            }
            return token;
        },
        session({ session, token, user }) {
            if (token) {
                session = token;
            }
            return session
        }
    },
    pages: {
        signIn: "/login"
    }
};