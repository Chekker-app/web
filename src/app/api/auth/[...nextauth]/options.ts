import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

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
        // buscar o usuário no banco de dados
        // comparar as senhas para ver se batem
        // se não tiver usuário, ou a senha não bater, retornar null

        const user = {
          id: 'ee7a3054-8e14-4940-a23e-7701bfe1cecd',
          email: 'feliper.silva011@gmail.com',
          password: 'bomdia',
          name: 'Felipe Silva',
          weeklyReports: false,
        };

        if (credentials?.password === user.password) {
          return user;
        } else {
          return null;
        }
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
