import { getUserByEmail } from '@/data/user';
import { LoginSchema } from '@/schemas';
import { NextAuthConfig } from 'next-auth';
import bcrypt from 'bcryptjs';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';

export default {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validateFileds = LoginSchema.safeParse(credentials);

        if (validateFileds.success) {
          const { email, password } = validateFileds.data;

          const existingUser = await getUserByEmail(email);
          if (!existingUser || !existingUser.password) return null;

          const passwordMatch = await bcrypt.compare(
            password,
            existingUser.password,
          );
          if (passwordMatch) return existingUser;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
