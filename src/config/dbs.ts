import mongoose from 'mongoose';
import config from './index';
import { errorlogger, logger } from '../shared/logger';
const dbConnect = async (): Promise<void> => {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('database is connected successfully');
  } catch (err: unknown | [message?: string] | string | undefined) {
    errorlogger.error('failed to connect database', err);
  }
};

export { dbConnect };
