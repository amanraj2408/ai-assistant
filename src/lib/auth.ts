import type { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/db/db';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.warn('Supabase credentials not configured - using local database only');
}

const providers = [];

// Add GitHub provider only if credentials are available
if (process.env.GITHUB_ID && process.env.GITHUB_SECRET) {
  providers.push(
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true,
    })
  );
}

// Add Google provider only if credentials are available
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    })
  );
}

// Add a demo credentials provider for local development
providers.push(
  CredentialsProvider({
    name: 'Demo',
    credentials: {
      email: { label: 'Email', type: 'email' },
    },
    async authorize(credentials) {
      // For demo purposes, accept any email
      if (credentials?.email) {
        return {
          id: credentials.email.replace(/[^a-z0-9]/g, '').substring(0, 20),
          email: credentials.email,
          name: credentials.email.split('@')[0],
        };
      }
      return null;
    },
  })
);

const authConfig: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  providers,
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const authOptions: NextAuthOptions = authConfig;
