'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.paginationHelpers = exports.calculatePagination = void 0;
const calculatePagination = options => {
  var _a;
  const page = Number(options.page || 1);
  const limit = Number(options.limit || 10);
  const skip = (page - 1) * limit;
  const sortBy =
    ((_a = options.sortBy) === null || _a === void 0
      ? void 0
      : _a.toString()) || 'createdAt';
  const sortOrder = options.sortOrder || 'desc';
  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};
exports.calculatePagination = calculatePagination;
exports.paginationHelpers = {
  calculatePagination: exports.calculatePagination,
};
