'use server';

import { createTransport } from 'nodemailer';

export const sendTestMail = async () => {
  const transporter = createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.PUBLIC_EMAIL_USERNAME,
      pass: process.env.PUBLIC_EMAIL_PASSWORD,
    },
  });

  const subject = 'Confirm Your Email';

  const html = `
  <div style=" text-align: center; max-width: 600px; margin: 50px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
      <div style="font-size: 24px; font-weight: bold; color: #333333; margin-bottom: 20px;">Welcome to Sexponent!</div>
      <div style="font-size: 16px; color: #666666; margin-bottom: 20px;">Please confirm your email address:</div>
      <a href="#" style="background-color: black; color: white; border: none; padding: 12px 24px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; border-radius: 5px;">Confirm Email</a>
    </div>
`;

  const mailOptions = {
    from: process.env.PUBLIC_EMAIL_USERNAME,
    to: 'pmsukk7@gmail.com',
    subject: subject,
    html: html,
  };

  try {
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Failed sending email: ', error);
      } else {
        console.log('Email sent: ', info.response);
      }
    });
    return { success: 'Email sent!' };
  } catch (error) {
    return { error: 'Failed to sent email!' };
  }
};
