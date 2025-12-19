import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
