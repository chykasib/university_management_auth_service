'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AcademicSemesterRoutes = void 0;
const express_1 = __importDefault(require('express'));
// import { UserController } from './user.controller';
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest')
);
const academicSmester_validation_1 = require('./academicSmester.validation');
const academicSemester_controller_1 = require('./academicSemester.controller');
const router = express_1.default.Router();
router.post(
  '/create-semester',
  (0, validateRequest_1.default)(
    academicSmester_validation_1.AcademicSemesterValidation
      .createAcademicSemesterUserZodSchema
  ),
  academicSemester_controller_1.AcademicSemesterController.createSemester
);
router.get(
  '/:id',
  academicSemester_controller_1.AcademicSemesterController.getSingleSemester
);
router.patch(
  '/:id',
  (0, validateRequest_1.default)(
    academicSmester_validation_1.AcademicSemesterValidation
      .updateAcademicSemesterUserZodSchema
  ),
  academicSemester_controller_1.AcademicSemesterController.updateSemester
);
router.delete(
  '/:id',
  academicSemester_controller_1.AcademicSemesterController.deleteSemester
);
router.get(
  '/',
  academicSemester_controller_1.AcademicSemesterController.getAllSemesters
);
exports.AcademicSemesterRoutes = router;
