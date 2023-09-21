import app from './app';
import { errorlogger, logger } from './shared/logger';
import { Server } from 'http';
import { RedisClient } from './shared/redis';

process.on('uncaughtException', err => {
  errorlogger.error('uncaught exception is detected ', err);
  process.exit(1);
});
let server: Server;
async function bootstrap() {
  try {
    await RedisClient.connect();
    server = app.listen(3001, () => {
      logger.info('server is running port 3001');
    });
  } catch (err) {
    errorlogger.error(err);
  }

  process.on('unhandledRejection', err => {
    if (server) {
      server.close(() => {
        errorlogger.error(err);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();

//sigterm
process.on('SIGTERM', () => {
  logger.info('SIGTERM IS RECEIVED...');
  if (server) {
    server.close();
  }
});
