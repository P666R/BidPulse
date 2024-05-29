import chalk from 'chalk';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';

import { systemLogs, morganMiddleware } from './utils/logger.js';

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morganMiddleware);

app.get('/api/v1/test', (req, res) => {
  res.status(200).json({
    message: 'API is running...',
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `${chalk.green.bold('✔')} 👍 Server running in ${chalk.yellow.bold(
      process.env.NODE_ENV,
    )} mode on port ${chalk.blue.bold(PORT)}`,
  );
  systemLogs.info(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`,
  );
});
