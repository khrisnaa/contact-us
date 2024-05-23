'use server';

import { createTransport } from 'nodemailer';

export const sendMail = async (
  to: string,
  subject: string,
  html: string,
  from?: string,
) => {
  const transporter = createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to,
    subject,
    html,
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
