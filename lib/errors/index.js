"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.throws = exports.Ebay_Api_Error = exports.Env_Error = exports.Setting_Error = exports.No_Call_Error = exports.No_Auth_Token_Error = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _es6Error = require("es6-error");

var _es6Error2 = _interopRequireDefault(_es6Error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Error object for ease of capturing if some service depends on .toJSON() method to log something
 * 
 * @ignore
 */
var Error = function (_Extendable_Error) {
  _inherits(Error, _Extendable_Error);

  function Error() {
    _classCallCheck(this, Error);

    return _possibleConstructorReturn(this, (Error.__proto__ || Object.getPrototypeOf(Error)).apply(this, arguments));
  }

  _createClass(Error, [{
    key: "toJSON",


    /**
     * returns a JSON representation of the Error
     *
     * @return     {Object}  json representation of the Error
     */
    value: function toJSON() {
      return {
        message: this.message,
        stack: this.stack,
        type: this.constructor.name,
        meta: this.meta || null
      };
    }
  }]);

  return Error;
}(_es6Error2.default);

/**
 * thrown when Request.prototype.run() is called without an authToken
 *
 * @class      No_Auth_Token (name)
 */


var No_Auth_Token_Error = exports.No_Auth_Token_Error = function (_Error) {
  _inherits(No_Auth_Token_Error, _Error);

  function No_Auth_Token_Error() {
    var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "no authToken present.  Please invoke `Ebay.prototype.authToken(<Token>)`.";

    _classCallCheck(this, No_Auth_Token_Error);

    return _possibleConstructorReturn(this, (No_Auth_Token_Error.__proto__ || Object.getPrototypeOf(No_Auth_Token_Error)).call(this, msg));
  }

  return No_Auth_Token_Error;
}(Error);

/**
 * thrown when Request.prototype.run() is called without having defined an eBay API call
 */

var No_Call_Error = exports.No_Call_Error = function (_Error2) {
  _inherits(No_Call_Error, _Error2);

  function No_Call_Error() {
    var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "no eBay API call defined, please invoke one.";

    _classCallCheck(this, No_Call_Error);

    return _possibleConstructorReturn(this, (No_Call_Error.__proto__ || Object.getPrototypeOf(No_Call_Error)).call(this, msg));
  }

  return No_Call_Error;
}(Error);

/**
 * thrown when attempting to change a setting that cannot be changed
 *
 * @param {String} setting    the setting that was attempted
 */

var Setting_Error = exports.Setting_Error = function (_Error3) {
  _inherits(Setting_Error, _Error3);

  function Setting_Error(setting) {
    _classCallCheck(this, Setting_Error);

    return _possibleConstructorReturn(this, (Setting_Error.__proto__ || Object.getPrototypeOf(Setting_Error)).call(this, "cannot configure \"state." + setting + "\" at this time, are you trying to define a Global on a Request?"));
  }

  return Setting_Error;
}(Error);

/**
 * thrown when attempting to load environment variables that don't exist
 */


var Env_Error = exports.Env_Error = function (_Error4) {
  _inherits(Env_Error, _Error4);

  function Env_Error(key) {
    _classCallCheck(this, Env_Error);

    return _possibleConstructorReturn(this, (Env_Error.__proto__ || Object.getPrototypeOf(Env_Error)).call(this, "could not find " + key + " in process.env"));
  }

  return Env_Error;
}(Error);

/**
 * Thrown when an Error occurs on eBay's side.
 * Allows for easier control flow with Promises
 * 
 * @example
 * 
 * Ebay
 *  .create(config)
 *  .GetSellerList()
 *  .run()
 *  .catch(errors.Ebay.Api_Error, App.handleErr)
 *  .catch( function (other_error) {
 *    handle(other_error)
 *  })
 */


var Ebay_Api_Error = exports.Ebay_Api_Error = function (_Error5) {
  _inherits(Ebay_Api_Error, _Error5);

  function Ebay_Api_Error(err) {
    _classCallCheck(this, Ebay_Api_Error);

    var _this6 = _possibleConstructorReturn(this, (Ebay_Api_Error.__proto__ || Object.getPrototypeOf(Ebay_Api_Error)).call(this, err.LongMessage || err.ShortMessage));

    _this6.meta = err;
    return _this6;
  }

  return Ebay_Api_Error;
}(Error);

/**
 * convenience methods for Error creation
 * 
 * @ignore
 * @type {Object}
 * 
 * @example
 *  throws.Error("an error message")
 *  throws.No_Auth_Token()
 */


var throws = exports.throws = Object.keys(exports).reduce(function (thrower, err) {
  if (err === "throws") return thrower;
  var cstr = exports[err];
  thrower[err] = function _thrower() {
    throw new (Function.prototype.bind.apply(cstr, [null].concat(Array.prototype.slice.call(arguments))))();
  };
  return thrower;
}, {});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9lcnJvcnMvaW5kZXguanMiXSwibmFtZXMiOlsiRXJyb3IiLCJtZXNzYWdlIiwic3RhY2siLCJ0eXBlIiwiY29uc3RydWN0b3IiLCJuYW1lIiwibWV0YSIsIk5vX0F1dGhfVG9rZW5fRXJyb3IiLCJtc2ciLCJOb19DYWxsX0Vycm9yIiwiU2V0dGluZ19FcnJvciIsInNldHRpbmciLCJFbnZfRXJyb3IiLCJrZXkiLCJFYmF5X0FwaV9FcnJvciIsImVyciIsIkxvbmdNZXNzYWdlIiwiU2hvcnRNZXNzYWdlIiwidGhyb3dzIiwiT2JqZWN0Iiwia2V5cyIsImV4cG9ydHMiLCJyZWR1Y2UiLCJ0aHJvd2VyIiwiY3N0ciIsIl90aHJvd2VyIiwiYXJndW1lbnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0FBRUE7Ozs7O0lBS01BLEs7Ozs7Ozs7Ozs7Ozs7QUFFSjs7Ozs7NkJBS1U7QUFDUixhQUFPO0FBQ0hDLGlCQUFVLEtBQUtBLE9BRFo7QUFFSEMsZUFBVSxLQUFLQSxLQUZaO0FBR0hDLGNBQVUsS0FBS0MsV0FBTCxDQUFpQkMsSUFIeEI7QUFJSEMsY0FBVSxLQUFLQSxJQUFMLElBQWE7QUFKcEIsT0FBUDtBQU1EOzs7Ozs7QUFJSDs7Ozs7OztJQUthQyxtQixXQUFBQSxtQjs7O0FBQ1gsaUNBQStGO0FBQUEsUUFBbkZDLEdBQW1GLHVFQUE3RSwyRUFBNkU7O0FBQUE7O0FBQUEscUlBQ3ZGQSxHQUR1RjtBQUU5Rjs7O0VBSHNDUixLOztBQU16Qzs7OztJQUlhUyxhLFdBQUFBLGE7OztBQUNYLDJCQUFrRTtBQUFBLFFBQXRERCxHQUFzRCx1RUFBaEQsOENBQWdEOztBQUFBOztBQUFBLHlIQUMxREEsR0FEMEQ7QUFFakU7OztFQUhnQ1IsSzs7QUFNbkM7Ozs7OztJQU1hVSxhLFdBQUFBLGE7OztBQUNYLHlCQUFhQyxPQUFiLEVBQXNCO0FBQUE7O0FBQUEsdUpBQ2FBLE9BRGI7QUFFckI7OztFQUhnQ1gsSzs7QUFNbkM7Ozs7O0lBR2FZLFMsV0FBQUEsUzs7O0FBQ1gscUJBQWFDLEdBQWIsRUFBa0I7QUFBQTs7QUFBQSxxSUFDUUEsR0FEUjtBQUVqQjs7O0VBSDRCYixLOztBQU8vQjs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlYWMsYyxXQUFBQSxjOzs7QUFDWCwwQkFBYUMsR0FBYixFQUFrQjtBQUFBOztBQUFBLGlJQUNWQSxJQUFJQyxXQUFKLElBQW1CRCxJQUFJRSxZQURiOztBQUVoQixXQUFLWCxJQUFMLEdBQVlTLEdBQVo7QUFGZ0I7QUFHakI7OztFQUppQ2YsSzs7QUFRcEM7Ozs7Ozs7Ozs7OztBQVVPLElBQU1rQiwwQkFBU0MsT0FBT0MsSUFBUCxDQUFZQyxPQUFaLEVBQXFCQyxNQUFyQixDQUE2QixVQUFDQyxPQUFELEVBQVVSLEdBQVYsRUFBa0I7QUFDbkUsTUFBSUEsUUFBUSxRQUFaLEVBQXNCLE9BQU9RLE9BQVA7QUFDdEIsTUFBTUMsT0FBT0gsUUFBUU4sR0FBUixDQUFiO0FBQ0FRLFVBQVFSLEdBQVIsSUFBZSxTQUFTVSxRQUFULEdBQXFCO0FBQUcsNkNBQVVELElBQVYsMkNBQWtCRSxTQUFsQjtBQUE4QixHQUFyRTtBQUNBLFNBQU9ILE9BQVA7QUFDRCxDQUxxQixFQUtuQixFQUxtQixDQUFmIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEV4dGVuZGFibGVfRXJyb3IgZnJvbSAnZXM2LWVycm9yJ1xuXG4vKipcbiAqIEVycm9yIG9iamVjdCBmb3IgZWFzZSBvZiBjYXB0dXJpbmcgaWYgc29tZSBzZXJ2aWNlIGRlcGVuZHMgb24gLnRvSlNPTigpIG1ldGhvZCB0byBsb2cgc29tZXRoaW5nXG4gKiBcbiAqIEBpZ25vcmVcbiAqL1xuY2xhc3MgRXJyb3IgZXh0ZW5kcyBFeHRlbmRhYmxlX0Vycm9yIHtcblxuICAvKipcbiAgICogcmV0dXJucyBhIEpTT04gcmVwcmVzZW50YXRpb24gb2YgdGhlIEVycm9yXG4gICAqXG4gICAqIEByZXR1cm4gICAgIHtPYmplY3R9ICBqc29uIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBFcnJvclxuICAgKi9cbiAgdG9KU09OICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBtZXNzYWdlIDogdGhpcy5tZXNzYWdlXG4gICAgICAsIHN0YWNrICAgOiB0aGlzLnN0YWNrXG4gICAgICAsIHR5cGUgICAgOiB0aGlzLmNvbnN0cnVjdG9yLm5hbWVcbiAgICAgICwgbWV0YSAgICA6IHRoaXMubWV0YSB8fCBudWxsXG4gICAgfVxuICB9XG59XG5cblxuLyoqXG4gKiB0aHJvd24gd2hlbiBSZXF1ZXN0LnByb3RvdHlwZS5ydW4oKSBpcyBjYWxsZWQgd2l0aG91dCBhbiBhdXRoVG9rZW5cbiAqXG4gKiBAY2xhc3MgICAgICBOb19BdXRoX1Rva2VuIChuYW1lKVxuICovXG5leHBvcnQgY2xhc3MgTm9fQXV0aF9Ub2tlbl9FcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IobXNnID0gXCJubyBhdXRoVG9rZW4gcHJlc2VudC4gIFBsZWFzZSBpbnZva2UgYEViYXkucHJvdG90eXBlLmF1dGhUb2tlbig8VG9rZW4+KWAuXCIpIHtcbiAgICBzdXBlcihtc2cpXG4gIH1cbn1cblxuLyoqXG4gKiB0aHJvd24gd2hlbiBSZXF1ZXN0LnByb3RvdHlwZS5ydW4oKSBpcyBjYWxsZWQgd2l0aG91dCBoYXZpbmcgZGVmaW5lZCBhbiBlQmF5IEFQSSBjYWxsXG4gKi9cblxuZXhwb3J0IGNsYXNzIE5vX0NhbGxfRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKG1zZyA9IFwibm8gZUJheSBBUEkgY2FsbCBkZWZpbmVkLCBwbGVhc2UgaW52b2tlIG9uZS5cIikge1xuICAgIHN1cGVyKG1zZylcbiAgfVxufVxuXG4vKipcbiAqIHRocm93biB3aGVuIGF0dGVtcHRpbmcgdG8gY2hhbmdlIGEgc2V0dGluZyB0aGF0IGNhbm5vdCBiZSBjaGFuZ2VkXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHNldHRpbmcgICAgdGhlIHNldHRpbmcgdGhhdCB3YXMgYXR0ZW1wdGVkXG4gKi9cblxuZXhwb3J0IGNsYXNzIFNldHRpbmdfRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yIChzZXR0aW5nKSB7XG4gICAgc3VwZXIoYGNhbm5vdCBjb25maWd1cmUgXCJzdGF0ZS4ke3NldHRpbmd9XCIgYXQgdGhpcyB0aW1lLCBhcmUgeW91IHRyeWluZyB0byBkZWZpbmUgYSBHbG9iYWwgb24gYSBSZXF1ZXN0P2ApXG4gIH1cbn1cblxuLyoqXG4gKiB0aHJvd24gd2hlbiBhdHRlbXB0aW5nIHRvIGxvYWQgZW52aXJvbm1lbnQgdmFyaWFibGVzIHRoYXQgZG9uJ3QgZXhpc3RcbiAqL1xuZXhwb3J0IGNsYXNzIEVudl9FcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IgKGtleSkge1xuICAgIHN1cGVyKGBjb3VsZCBub3QgZmluZCAke2tleX0gaW4gcHJvY2Vzcy5lbnZgKVxuICB9XG59XG5cblxuLyoqXG4gKiBUaHJvd24gd2hlbiBhbiBFcnJvciBvY2N1cnMgb24gZUJheSdzIHNpZGUuXG4gKiBBbGxvd3MgZm9yIGVhc2llciBjb250cm9sIGZsb3cgd2l0aCBQcm9taXNlc1xuICogXG4gKiBAZXhhbXBsZVxuICogXG4gKiBFYmF5XG4gKiAgLmNyZWF0ZShjb25maWcpXG4gKiAgLkdldFNlbGxlckxpc3QoKVxuICogIC5ydW4oKVxuICogIC5jYXRjaChlcnJvcnMuRWJheS5BcGlfRXJyb3IsIEFwcC5oYW5kbGVFcnIpXG4gKiAgLmNhdGNoKCBmdW5jdGlvbiAob3RoZXJfZXJyb3IpIHtcbiAqICAgIGhhbmRsZShvdGhlcl9lcnJvcilcbiAqICB9KVxuICovXG5leHBvcnQgY2xhc3MgRWJheV9BcGlfRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yIChlcnIpIHtcbiAgICBzdXBlcihlcnIuTG9uZ01lc3NhZ2UgfHwgZXJyLlNob3J0TWVzc2FnZSlcbiAgICB0aGlzLm1ldGEgPSBlcnJcbiAgfVxufVxuXG5cbi8qKlxuICogY29udmVuaWVuY2UgbWV0aG9kcyBmb3IgRXJyb3IgY3JlYXRpb25cbiAqIFxuICogQGlnbm9yZVxuICogQHR5cGUge09iamVjdH1cbiAqIFxuICogQGV4YW1wbGVcbiAqICB0aHJvd3MuRXJyb3IoXCJhbiBlcnJvciBtZXNzYWdlXCIpXG4gKiAgdGhyb3dzLk5vX0F1dGhfVG9rZW4oKVxuICovXG5leHBvcnQgY29uc3QgdGhyb3dzID0gT2JqZWN0LmtleXMoZXhwb3J0cykucmVkdWNlKCAodGhyb3dlciwgZXJyKSA9PiB7XG4gIGlmIChlcnIgPT09IFwidGhyb3dzXCIpIHJldHVybiB0aHJvd2VyXG4gIGNvbnN0IGNzdHIgPSBleHBvcnRzW2Vycl1cbiAgdGhyb3dlcltlcnJdID0gZnVuY3Rpb24gX3Rocm93ZXIgKCkgeyAgdGhyb3cgbmV3IGNzdHIoLi4uYXJndW1lbnRzKSB9XG4gIHJldHVybiB0aHJvd2VyXG59LCB7fSkiXX0=