'use server';

import { getUserByEmail } from '@/data/user';
import { sendResetPasswordEmail } from '@/lib/mails';
import { generateResetPasswordToken } from '@/lib/tokens';
import { ResetSchema } from '@/schemas';
import { z } from 'zod';

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validateFields = ResetSchema.safeParse(values);
  if (!validateFields.success) return { errror: 'Invalid fields!' };

  const { email } = validateFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser) return { error: 'User does not exist!' };

  const resetPasswordToken = await generateResetPasswordToken(email);

  await sendResetPasswordEmail(
    resetPasswordToken.email,
    resetPasswordToken.token,
  );

  return { success: 'Reset email sent!' };
};
