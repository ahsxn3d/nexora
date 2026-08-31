import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '../../../../lib/prisma';

const hasDatabase = !!process.env.DATABASE_URL;

const authOptions: NextAuthOptions = {
  // Use Prisma adapter for database persistence in Neon PostgreSQL if DATABASE_URL is provided
  ...(hasDatabase ? { adapter: PrismaAdapter(prisma) } : {}),

  providers: [
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            allowDangerousEmailAccountLinking: true,
          }),
        ]
      : []),
    CredentialsProvider({
      name: 'Scholar Account',
      credentials: {
        name: { label: 'Candidate Name', type: 'text', placeholder: 'Ahsan' },
        email: { label: 'Email', type: 'email', placeholder: 'scholar@nexora.app' },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;

        const email = credentials.email.toLowerCase().trim();
        const name = credentials.name?.trim() || 'Scholar Candidate';

        if (hasDatabase) {
          try {
            // Find or upsert user in Neon Postgres via Prisma
            let user = await prisma.user.findUnique({
              where: { email },
            });

            if (!user) {
              user = await prisma.user.create({
                data: {
                  email,
                  name,
                  image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
                  targetCountry: 'Pakistan',
                },
              });
            }

            return {
              id: user.id,
              name: user.name,
              email: user.email,
              image: user.image,
            };
          } catch (e) {
            console.error('Prisma user lookup error, falling back to local session:', e);
          }
        }

        // Fallback if database is offline or not yet connected
        return {
          id: `usr_${Date.now()}`,
          name,
          email,
          image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        };
      },
    }),
  ],

  // 1-Year Long-Lived Session Persistence (365 days)
  session: {
    strategy: hasDatabase ? 'jwt' : 'jwt',
    maxAge: 365 * 24 * 60 * 60, // 1 Year (31,536,000 seconds)
    updateAge: 24 * 60 * 60,    // Refresh every 24 hours
  },

  jwt: {
    maxAge: 365 * 24 * 60 * 60, // 1 Year JWT token life
  },

  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 365 * 24 * 60 * 60, // Keep cookie on device for 1 year
      },
    },
  },

  secret: process.env.NEXTAUTH_SECRET || 'nexora_secure_secret_key_admissions_roadmap_2026',

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        (session.user as any).id = token.id || token.sub;
        session.user.name = token.name || session.user.name;
        session.user.email = token.email || session.user.email;
        session.user.image = (token.picture as string) || session.user.image;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
