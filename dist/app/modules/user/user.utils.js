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
Object.defineProperty(exports, '__esModule', { value: true });
exports.generateFacultyId =
  exports.generateStudentId =
  exports.findLastFacultyId =
  exports.findLastStudentId =
    void 0;
const user_module_1 = require('./user.module');
const findLastStudentId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const lastUser = yield user_module_1.User.findOne({}, { id: 1, _id: 0 })
      .sort({
        createdAt: -1,
      })
      .lean();
    return lastUser === null || lastUser === void 0 ? void 0 : lastUser.id;
  });
exports.findLastStudentId = findLastStudentId;
const findLastFacultyId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const lastFaculty = yield user_module_1.User.findOne({}, { id: 1, _id: 0 })
      .sort({
        createdAt: -1,
      })
      .lean();
    return lastFaculty === null || lastFaculty === void 0
      ? void 0
      : lastFaculty.id;
  });
exports.findLastFacultyId = findLastFacultyId;
const generateStudentId = academicSemester =>
  __awaiter(void 0, void 0, void 0, function* () {
    const currentId =
      (yield (0, exports.findLastStudentId)()) ||
      (0).toString().padStart(5, '0'); //00000
    //increment by 1
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    incrementedId = `${academicSemester.year.substring(2)}${
      academicSemester.code
    }${incrementedId}`;
    return incrementedId;
  });
exports.generateStudentId = generateStudentId;
const generateFacultyId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const currentId =
      (yield (0, exports.findLastStudentId)()) ||
      (0).toString().padStart(5, '0'); //00000
    //increment by 1
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    incrementedId = `F-${incrementedId}`;
    return incrementedId;
  });
exports.generateFacultyId = generateFacultyId;
