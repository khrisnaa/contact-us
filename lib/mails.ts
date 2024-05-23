import { sendMail } from '@/actions/send-mail';

export const sendVerificationEmail = async (email: string, token: string) => {
  const link = `http://localhost:3000/auth/new-verification?token=${token}`;
  const subject = `Confirm your email`;
  const html = `<div style="text-align: center;">
                  <p style="font-weight:bold;">Welcome to Exponent!</p>
                  <p>Please confirm your email address:</p>
                  <a href="${link}" style="display: inline-block; background-color: #007bff; color: #ffffff; border-radius: 4px; padding: 10px 20px; text-decoration: none; margin-top: 15px;">Confirm Email</a>
                  </div>`;
  await sendMail(email, subject, html);
};
export const sendResetPasswordEmail = async (email: string, token: string) => {
  const link = `http://localhost:3000/auth/new-password?token=${token}`;
  const subject = `Confirm your email`;
  const html = `<div style="text-align: center;">
                  <p style="font-weight:bold;">Reset your password!</p>
                  <p>Click here to continue change your password:</p>
                  <a href="${link}" style="display: inline-block; background-color: #007bff; color: #ffffff; border-radius: 4px; padding: 10px 20px; text-decoration: none; margin-top: 15px;">Continue</a>
                  </div>`;
  await sendMail(email, subject, html);
};
