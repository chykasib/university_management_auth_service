import express, { Application } from 'express';
import cors from 'cors';
import { dbConnect } from './config/dbs';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { UserRoutes } from './app/modules/user/user.route';

const app: Application = express();

app.use(cors());
// parser

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbConnect();
// Application routes
console.log(process.env);
app.use('/api/v1/users/', UserRoutes);

// testing route
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   // Promise.reject(new Error('Unhandled promise rejection'))
//   //   throw new ApiError(400, 'orebaba error ')
//   //   next('ore baba') // error
//   throw new Error('ore baba')
// })

// global error handler

app.use(globalErrorHandler);
export default app;
