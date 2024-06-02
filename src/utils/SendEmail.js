import 'dotenv/config';
import fs from 'fs';
import handlebars from 'handlebars';
import path from 'path';
import transporter from '../helpers/EmailTransport.js';
import { systemLogs } from './Logger.js';

const sendEmail = async (email, subject, payload, template) => {
  try {
    const sourceDirectory = fs.readFileSync(
      path.join(
        process.cwd(),
        'src',
        'utils',
        'emails',
        'template',
        path.basename(template),
      ),
      'utf8',
    );

    const compiledTemplate = handlebars.compile(sourceDirectory);

    const emailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: subject,
      html: compiledTemplate(payload),
    };
    await transporter.sendMail(emailOptions);
  } catch (error) {
    systemLogs.error(`Email not sent: ${error}`);
  }
};

export default sendEmail;
