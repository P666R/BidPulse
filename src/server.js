import 'dotenv/config';
import chalk from 'chalk';
import morgan from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/AuthRoutes.js';
import { systemLogs, morganMiddleware } from './utils/Logger.js';
import { errorHandler, notFound } from './middleware/ErrorMiddleware.js';

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

app.use('/api/v1/auth', authRoutes);

app.use(notFound);
app.use(errorHandler);

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
