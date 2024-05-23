'use server';

import { sendContactUsEmail } from '@/lib/mails';
import { ContactUsSchema } from '@/schemas';
import { z } from 'zod';

export const sendContactUsMail = async (
  values: z.infer<typeof ContactUsSchema>,
  email: string,
) => {
  const validateFields = ContactUsSchema.safeParse(values);
  if (!validateFields.success) return { errror: 'Invalid fields!' };

  const { message } = validateFields.data;

  await sendContactUsEmail(email, message);

  return { success: 'Email sent!' };
};
