import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { dbConnect } from './config/dbs';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routers from './app/routes';
import httpStatus from 'http-status';
import { generateFacultyId } from './app/modules/user/user.utils';

const app: Application = express();

app.use(cors());
// parser

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbConnect();
// Application routes
// console.log(process.env);
// app.use('/api/v1/users/', UserRoutes);
// app.use('/api/v1/academic-semester/', AcademicSemesterRoutes);

app.use('/api/v1/', routers);

// testing route
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   // Promise.reject(new Error('Unhandled promise rejection'))
//   //   throw new ApiError(400, 'orebaba error ')
//   //   next('ore baba') // error
//   throw new Error('ore baba')
// })

// global error handler

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'Api Not Founded',
      },
    ],
  });
  next();
});

const academicSemester = {
  title: 'Autumn',
  code: '01',
  year: '2023',
  startMonth: 'June',
  endMonth: 'November',
};

const testId = async () => {
  const testId = await generateFacultyId(academicSemester);
  console.log(testId);
};

testId();
export default app;
