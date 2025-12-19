import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Supabase credentials are available via env variables
// when setting up Supabase magic link auth in the future:
// import { createClient } from '@supabase/supabase-js';
// const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

const providers = [];

// Demo credentials provider for testing (before setting up Supabase magic links)
providers.push(
  CredentialsProvider({
    name: 'Demo',
    credentials: {
      email: { label: 'Email', type: 'email' },
    },
    async authorize(credentials) {
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

export const authOptions: NextAuthOptions = {
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
