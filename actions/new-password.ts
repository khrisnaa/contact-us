'use server';

import { getResetPasswordTokenByToken } from '@/data/reset-password-token';
import { getUserByEmail } from '@/data/user';
import { db } from '@/lib/db';
import { NewPasswordSchema } from '@/schemas';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token: string,
) => {
  const validateFields = NewPasswordSchema.safeParse(values);
  if (!validateFields.success) return { error: 'Invalid fields!' };

  const { password } = validateFields.data;

  const existingToken = await getResetPasswordTokenByToken(token);
  if (!existingToken) return { error: 'Token is missing!' };

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) return { error: 'Token has expired!' };

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) return { error: 'User does not exist!' };

  const hashedPassword = await bcrypt.hash(password, 12);

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      password: hashedPassword,
      email: existingToken.email,
    },
  });

  await db.resetPasswordToken.delete({ where: { id: existingToken.id } });

  return { success: 'Password successfully changed!' };
};
