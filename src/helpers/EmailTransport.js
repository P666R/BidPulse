import 'dotenv/config';
import nodemailer from 'nodemailer';

const transporter =
  process.env.NODE_ENV === 'development'
    ? nodemailer.createTransport({
        host: 'mailhog',
        port: 1025,
      })
    : null;

export default transporter;
