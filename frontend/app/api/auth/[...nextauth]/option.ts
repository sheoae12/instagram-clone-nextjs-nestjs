import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import FaceBookProvider from 'next-auth/providers/facebook'
import { toast } from 'react-toastify'

export const options: NextAuthOptions = {
	providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                account: { label: 'account', type: 'text' },
                password: { label: 'password', type: 'password' }
            },
            async authorize(credentials, req): Promise<any> {
                const res = await fetch(process.env.API_URL+'/api/signin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        account: credentials?.account, 
                        password: credentials?.password 
                    })
                })
                const data = await res.json()

                if (res && res.ok) {
                    return data
                } else if (res && !res.ok) {
                    return null
                }
               
            },
        })
    ],
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async jwt({ token, user }) {
          return { ...token, ...user };
        },
    
        async session({ session, token }) {
          session.user = token as any;
          return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: '/'
	}
}