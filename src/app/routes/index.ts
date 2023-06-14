import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester.route';
const router = express.Router();

const modulesRoutes = [
  {
    path: '/users',
    router: UserRoutes,
  },

  {
    path: '/academic-semester/',
    router: AcademicSemesterRoutes,
  },
];

modulesRoutes.forEach(route => router.use(route.path, route.router));
export default router;
