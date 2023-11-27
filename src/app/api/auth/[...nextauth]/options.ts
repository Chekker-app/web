import { prisma } from '@/lib/prisma';
import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

// pass 5Ywfacg3

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'email',
          type: 'text',
          placeholder: ' your username',
        },
        password: {
          label: 'password',
          type: 'password',
          placeholder: 'your password',
        },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!user) {
          return null;
        }

        const matchPassword = bcrypt.compareSync(
          credentials?.password ?? '',
          user.password ?? '',
        );

        if (!matchPassword) {
          return null;
        }

        return user;
      },
    }),
  ],
  // callbacks: {
  //   async jwt({ token, user }) {
  //     user && (token.user = user);
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     console.log('token aqui', token);
  //     session.user = token.user as any;
  //     return session;
  //   },
  // },
  callbacks: {
    session({ session }: any) {
      return session;
    },
    jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user.id;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET ?? '',
  session: {
    strategy: 'jwt',
    maxAge: 8 * 60 * 60,
  },
  pages: {
    signIn: '/login',
  },
};
