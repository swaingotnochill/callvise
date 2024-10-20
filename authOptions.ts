import { DefaultSession, NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { JWT } from "next-auth/jwt"
import { Session, Account } from "next-auth"

// Extend the Session type
declare module "next-auth" {
        interface Session extends DefaultSession {
                accessToken?: string
        }
}

export const authOptions: NextAuthOptions = {
        providers: [
                GoogleProvider({
                        clientId: process.env.GOOGLE_CLIENT_ID as string,
                        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
                }),
        ],
        pages: {
                signIn: '/auth/login',
        },
        callbacks: {
                async jwt({ token, account }: {
                        token: JWT;
                        account?: Account | null;
                }): Promise<JWT> {
                        if (account && account?.access_token) {
                                token.accessToken = account?.access_token;
                        }
                        return token;
                },
                async session({ session, token }: { session: Session, token: JWT }) {
                        session.accessToken = token.accessToken as string
                        return session
                },
        },
};


