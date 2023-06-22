'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const cors_1 = __importDefault(require('cors'));
const dbs_1 = require('./config/dbs');
const globalErrorHandler_1 = __importDefault(
  require('./app/middlewares/globalErrorHandler')
);
const routes_1 = __importDefault(require('./app/routes'));
const http_status_1 = __importDefault(require('http-status'));
const user_utils_1 = require('./app/modules/user/user.utils');
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
(0, dbs_1.dbConnect)();
// Application routes
// console.log(process.env);
// app.use('/api/v1/users/', UserRoutes);
// app.use('/api/v1/academic-semester/', AcademicSemesterRoutes);
app.use('/api/v1/', routes_1.default);
// testing route
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   // Promise.reject(new Error('Unhandled promise rejection'))
//   //   throw new ApiError(400, 'orebaba error ')
//   //   next('ore baba') // error
//   throw new Error('ore baba')
// })
// global error handler
app.use(globalErrorHandler_1.default);
app.use((req, res, next) => {
  res.status(http_status_1.default.NOT_FOUND).json({
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
const testId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const testId = yield (0, user_utils_1.generateFacultyId)(academicSemester);
    console.log(testId);
  });
testId();
exports.default = app;
