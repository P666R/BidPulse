import { PrismaClient } from '@prisma/client';
import chalk from 'chalk';
import { systemLogs } from '../utils/Logger.js';

const prisma = global.prisma || new PrismaClient();

if (!global.prisma) {
  global.prisma = prisma;

  prisma.$connect().catch((error) => {
    console.error(
      `${chalk.red.bold('❌')} Failed to connect to database: ${error}`,
    );
    systemLogs.error(
      `${chalk.red.bold('❌')} Failed to connect to database: ${error}`,
    );
    process.exit(1);
  });

  process.on('beforeExit', async () => {
    await prisma.$disconnect();
    console.log(`${chalk.green.bold('✔')} Database connection closed.}`);
    systemLogs.info(`${chalk.green.bold('✔')} Database connection closed.}`);
  });
}

export default prisma;

// const prisma = global.prisma || new PrismaClient();
// if (!global.prisma) {
//   global.prisma = prisma;
// }
// export default prisma;
