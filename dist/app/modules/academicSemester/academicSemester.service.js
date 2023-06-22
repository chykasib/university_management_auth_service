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
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AcademicSemesterService = void 0;
const apiError_1 = __importDefault(require('../../../errors/apiError'));
const paginationHelper_1 = require('../../../helpers/paginationHelper');
const academicSemester_constant_1 = require('./academicSemester.constant');
const academicSemesterModel_1 = require('./academicSemesterModel');
const http_status_1 = __importDefault(require('http-status'));
const createSemester = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (
      academicSemester_constant_1.academicSemesterTitleCodeMapper[
        payload.title
      ] !== payload.code
    ) {
      throw new apiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Invalid semester code'
      );
    }
    const result = yield academicSemesterModel_1.AcademicSemester.create(
      payload
    );
    return result;
  });
const getAllSemesters = (filters, paginationOptions) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters,
      filtersData = __rest(filters, ['searchTerm']);
    const andCondition = [];
    if (searchTerm) {
      andCondition.push({
        $or: academicSemester_constant_1.academicSemesterSearchableFields.map(
          field => ({
            [field]: { $regex: searchTerm, $options: 'i' },
          })
        ),
      });
    }
    if (Object.keys(filtersData).length) {
      andCondition.push({
        $and: Object.entries(filtersData).map(([field, value]) => ({
          [field]: value,
        })),
      });
    }
    // const andCondition = [
    //   {
    //     $or: [
    //       {
    //         title: {
    //           $regex: searchTerm,
    //           $options: 'i',
    //         },
    //       },
    //       {
    //         code: {
    //           $regex: searchTerm,
    //           $options: 'i',
    //         },
    //       },
    //       {
    //         year: {
    //           $regex: searchTerm,
    //           $options: 'i',
    //         },
    //       },
    //     ],
    //   },
    // ];
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelper_1.paginationHelpers.calculatePagination(
        paginationOptions
      );
    const sortCondition = {};
    if (sortBy && sortOrder) {
      sortCondition[sortBy] = sortOrder;
    }
    const whereConditions =
      andCondition.length > 1 ? { $and: andCondition } : {};
    const result = yield academicSemesterModel_1.AcademicSemester.find(
      whereConditions
    )
      .sort(sortCondition)
      .skip(skip)
      .limit(limit);
    const total =
      yield academicSemesterModel_1.AcademicSemester.countDocuments();
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    };
  });
const getSingleSemester = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemesterModel_1.AcademicSemester.findById(id);
    return result;
  });
const updateSemester = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (
      payload.title &&
      payload.code &&
      academicSemester_constant_1.academicSemesterTitleCodeMapper[
        payload.title
      ] !== payload.code
    ) {
      throw new apiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Invalid semester code'
      );
    }
    const result =
      yield academicSemesterModel_1.AcademicSemester.findOneAndUpdate(
        { _id: id },
        payload,
        {
          new: true,
        }
      );
    return result;
  });
const deleteSemester = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result =
      yield academicSemesterModel_1.AcademicSemester.findByIdAndDelete(id);
    return result;
  });
exports.AcademicSemesterService = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};
