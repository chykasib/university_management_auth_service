import express from 'express';
// import { UserController } from './user.controller';
import ValidateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSmester.validation';
import { AcademicSemesterController } from './academicSemester.controller';
const router = express.Router();

router.post(
  '/create-semester',
  ValidateRequest(
    AcademicSemesterValidation.createAcademicSemesterUserZodSchema
  ),
  AcademicSemesterController.createSemester
);

router.get('/:id', AcademicSemesterController.getSingleSemester);
router.patch(
  '/:id',
  ValidateRequest(
    AcademicSemesterValidation.updateAcademicSemesterUserZodSchema
  ),
  AcademicSemesterController.updateSemester
);

router.delete('/:id', AcademicSemesterController.deleteSemester);

router.get('/', AcademicSemesterController.getAllSemesters);
export const AcademicSemesterRoutes = router;
