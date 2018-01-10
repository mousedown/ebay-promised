"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = range;
/**
 * Ascending inclusive range generator
 * 
 * @param   {Integer}  min    the min value in the range
 * @param   {Integer}  max    the max value in the range
 * @returns {Array}           the range
 */
function range(min, max) {
  return Array(max + 1 - min).fill(0).map(function (_, i) {
    return i + min;
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi91dGlscy9yYW5nZS5qcyJdLCJuYW1lcyI6WyJyYW5nZSIsIm1pbiIsIm1heCIsIkFycmF5IiwiZmlsbCIsIm1hcCIsIl8iLCJpIl0sIm1hcHBpbmdzIjoiOzs7OztrQkFPd0JBLEs7QUFQeEI7Ozs7Ozs7QUFPZSxTQUFTQSxLQUFULENBQWdCQyxHQUFoQixFQUFxQkMsR0FBckIsRUFBMEI7QUFDdkMsU0FBT0MsTUFBTUQsTUFBTSxDQUFOLEdBQVVELEdBQWhCLEVBQXFCRyxJQUFyQixDQUEwQixDQUExQixFQUE2QkMsR0FBN0IsQ0FBa0MsVUFBQ0MsQ0FBRCxFQUFJQyxDQUFKO0FBQUEsV0FBU0EsSUFBSU4sR0FBYjtBQUFBLEdBQWxDLENBQVA7QUFDRCIsImZpbGUiOiJyYW5nZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQXNjZW5kaW5nIGluY2x1c2l2ZSByYW5nZSBnZW5lcmF0b3JcbiAqIFxuICogQHBhcmFtICAge0ludGVnZXJ9ICBtaW4gICAgdGhlIG1pbiB2YWx1ZSBpbiB0aGUgcmFuZ2VcbiAqIEBwYXJhbSAgIHtJbnRlZ2VyfSAgbWF4ICAgIHRoZSBtYXggdmFsdWUgaW4gdGhlIHJhbmdlXG4gKiBAcmV0dXJucyB7QXJyYXl9ICAgICAgICAgICB0aGUgcmFuZ2VcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmFuZ2UgKG1pbiwgbWF4KSB7XG4gIHJldHVybiBBcnJheShtYXggKyAxIC0gbWluKS5maWxsKDApLm1hcCggKF8sIGkpPT4gaSArIG1pbiApXG59Il19