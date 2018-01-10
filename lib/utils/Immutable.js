"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Immutable helpers
 * 
 * This is a naive implementation since we only care about Objects
 * If we move to handling Arrays we will need to account for that.
 * 
 */
var Immutable = function () {
  function Immutable() {
    _classCallCheck(this, Immutable);
  }

  _createClass(Immutable, null, [{
    key: "merge",


    /**
     * merges a collection of objects into a new Object
     *
     * @param      {Array}   objects  The objects to merge
     * @return     {Object}           The result
     */
    value: function merge() {
      for (var _len = arguments.length, objects = Array(_len), _key = 0; _key < _len; _key++) {
        objects[_key] = arguments[_key];
      }

      return Object.assign.apply(null, [{}].concat(objects));
    }

    /**
     * makes a copy of an Object
     *
     * @param      {Object}  obj     The object to copy
     * @return     {Object}          The copy
     */

  }, {
    key: "copy",
    value: function copy(obj) {
      return Object.assign({}, obj);
    }
  }]);

  return Immutable;
}();

exports.default = Immutable;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi91dGlscy9JbW11dGFibGUuanMiXSwibmFtZXMiOlsiSW1tdXRhYmxlIiwib2JqZWN0cyIsIk9iamVjdCIsImFzc2lnbiIsImFwcGx5IiwiY29uY2F0Iiwib2JqIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7SUFPcUJBLFM7Ozs7Ozs7OztBQUVuQjs7Ozs7OzRCQU0wQjtBQUFBLHdDQUFUQyxPQUFTO0FBQVRBLGVBQVM7QUFBQTs7QUFDeEIsYUFBT0MsT0FBT0MsTUFBUCxDQUFjQyxLQUFkLENBQW9CLElBQXBCLEVBQTBCLENBQUMsRUFBRCxFQUFLQyxNQUFMLENBQVlKLE9BQVosQ0FBMUIsQ0FBUDtBQUNEOztBQUVEOzs7Ozs7Ozs7eUJBTWFLLEcsRUFBSztBQUNoQixhQUFPSixPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQkcsR0FBbEIsQ0FBUDtBQUNEOzs7Ozs7a0JBcEJrQk4sUyIsImZpbGUiOiJJbW11dGFibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEltbXV0YWJsZSBoZWxwZXJzXG4gKiBcbiAqIFRoaXMgaXMgYSBuYWl2ZSBpbXBsZW1lbnRhdGlvbiBzaW5jZSB3ZSBvbmx5IGNhcmUgYWJvdXQgT2JqZWN0c1xuICogSWYgd2UgbW92ZSB0byBoYW5kbGluZyBBcnJheXMgd2Ugd2lsbCBuZWVkIHRvIGFjY291bnQgZm9yIHRoYXQuXG4gKiBcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW1tdXRhYmxlIHtcblxuICAvKipcbiAgICogbWVyZ2VzIGEgY29sbGVjdGlvbiBvZiBvYmplY3RzIGludG8gYSBuZXcgT2JqZWN0XG4gICAqXG4gICAqIEBwYXJhbSAgICAgIHtBcnJheX0gICBvYmplY3RzICBUaGUgb2JqZWN0cyB0byBtZXJnZVxuICAgKiBAcmV0dXJuICAgICB7T2JqZWN0fSAgICAgICAgICAgVGhlIHJlc3VsdFxuICAgKi8gXG4gIHN0YXRpYyBtZXJnZSAoLi4ub2JqZWN0cykge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduLmFwcGx5KG51bGwsIFt7fV0uY29uY2F0KG9iamVjdHMpKVxuICB9XG5cbiAgLyoqXG4gICAqIG1ha2VzIGEgY29weSBvZiBhbiBPYmplY3RcbiAgICpcbiAgICogQHBhcmFtICAgICAge09iamVjdH0gIG9iaiAgICAgVGhlIG9iamVjdCB0byBjb3B5XG4gICAqIEByZXR1cm4gICAgIHtPYmplY3R9ICAgICAgICAgIFRoZSBjb3B5XG4gICAqL1xuICBzdGF0aWMgY29weSAob2JqKSB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIG9iailcbiAgfVxuXG59Il19