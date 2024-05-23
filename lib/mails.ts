import { sendMail } from '@/actions/send-mail';
const domain = process.env.PUBLIC_APP_URL;
const defaultSender = process.env.EMAIL_USERNAME || '';
export const sendVerificationEmail = async (email: string, token: string) => {
  const link = `${domain}/auth/new-verification?token=${token}`;
  const subject = 'Confirm Your Email';

  const html = `
  <div style=" text-align: center; max-width: 600px; margin: 50px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
      <div style="font-size: 24px; font-weight: bold; color: #333333; margin-bottom: 20px;">Welcome to Sexponent!</div>
      <div style="font-size: 16px; color: #666666; margin-bottom: 20px;">Please confirm your email address:</div>
      <a href="${link}" style="background-color: black; color: white; border: none; padding: 12px 24px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; border-radius: 5px;">Confirm Email</a>
    </div>
`;
  await sendMail(email, subject, html);
};
export const sendResetPasswordEmail = async (email: string, token: string) => {
  const link = `${domain}/auth/new-password?token=${token}`;
  const subject = 'Verify Your Email';

  const html = `
  <div style=" text-align: center; max-width: 600px; margin: 50px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
      <div style="font-size: 24px; font-weight: bold; color: #333333; margin-bottom: 20px;">Verify Your Email!</div>
      <div style="font-size: 16px; color: #666666; margin-bottom: 20px;">Click here to verify your email address:</div>
      <a href="${link}" style="background-color: black; color: white; border: none; padding: 12px 24px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; border-radius: 5px;">Verify Email</a>
    </div>
`;

  await sendMail(email, subject, html);
};

export const sendContactUsEmail = async (
  email: string,
  name: string,
  message: string,
) => {
  const subject = `Send by ${email}`;
  const html = `<div
  style="
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  "
>
  <div
    style="
      font-size: 16px;
      text-align: justify;
      margin-bottom: 20px;
    "
  >
    <p>Hi I'm ${name},</p>
    <p>
     ${message}
    </p>
  </div>
</div>
`;

  await sendMail(defaultSender, subject, html);
};
