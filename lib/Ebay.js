"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

// dynamic definitions aggregated from crawling Ebay"s API docs


var _Request = require("./Request");

var _Request2 = _interopRequireDefault(_Request);

var _errors = require("./errors");

var _Immutable = require("./utils/Immutable");

var _Immutable2 = _interopRequireDefault(_Immutable);

var _endpoints = require("./definitions/endpoints");

var _endpoints2 = _interopRequireDefault(_endpoints);

var _fields = require("./definitions/fields");

var _fields2 = _interopRequireDefault(_fields);

var _globals = require("./definitions/globals");

var _globals2 = _interopRequireDefault(_globals);

var _verbs = require("./definitions/verbs");

var _verbs2 = _interopRequireDefault(_verbs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ebay = function () {
  _createClass(Ebay, null, [{
    key: "create",

    /**
     * pure creation interface useful for iterations and other places where context may be lost
     *
     * @return     {this}  a new Ebay instance
     */
    value: function create(settings) {
      return new Ebay(settings);
    }

    /**
     * Loads credentials from `process.env`
     * 
     * @return {this}          a new Ebay instance
     * @throws {Env_Error}
     */

  }, {
    key: "fromEnv",
    value: function fromEnv() {
      return Ebay.create({
        authToken: process.env.EBAY_TOKEN || _errors.throws.Env_Error("EBAY_TOKEN"),
        cert: process.env.EBAY_CERT || _errors.throws.Env_Error("EBAY_CERT"),
        app: process.env.EBAY_APP_ID || _errors.throws.Env_Error("EBAY_APP_ID"),
        devName: process.env.EBAY_DEV_ID || _errors.throws.Env_Error("EBAY_DEV_ID"),
        sandbox: process.env.EBAY_SANDBOX || false,
        apiv: process.env.API_VERSION || "775"
      });
    }

    /**
     * 
     *
     * @param      {Object}  settings the global settings
     * @return     {Ebay}
     */

  }]);

  function Ebay(settings) {
    _classCallCheck(this, Ebay);

    /**
     * global settings for all following Ebay requests
     */
    this.globals = _Immutable2.default.merge(Ebay.defaults, settings);
    /**
     * insure an error is thrown if internals are changed
     * allows for better assertions about the statefulness 
     */
    Object.freeze(this.globals);
  }

  /**
   * Deprecated in favor of `Ebay.prototype.run`
   * adds to developer ergonomics by adding a sensible error
   * 
   * @deprecated
   * @throws     {Error}
   * @return      null
   */


  _createClass(Ebay, [{
    key: "invoke",
    value: function invoke() {
      console.warn("deprecation warning :: the .invoke() method has been migrated to .run() and will be removed in the next major release");
      return this.run();
    }

    /**
     * developer ergonomic error that ensures we have at least defined the verb we want to attempt
     * 
     * @throws {Error} 
     * @return null
     */

  }, {
    key: "run",
    value: function run() {
      _errors.throws.Error("Cannot run an empty Request, please define an eBay verb or field");
    }
  }]);

  return Ebay;
}();

/**
 * defaults for eBay API
 */


exports.default = Ebay;
Ebay.defaults = {
  serviceName: "Trading",
  sandbox: false,
  site: 0,
  raw: false // return raw XML -> JSON response from Ebay
  , perPage: 100

  /**
   * reference to the {Request} class
   */
};Ebay.Request = _Request2.default;

_verbs2.default.forEach(function (verb) {
  Ebay[verb] = function () {
    return Ebay.create()[verb]();
  };

  Ebay.prototype[verb] = function () {
    return Ebay.Request.create(this)[verb]();
  };
});

Object.keys(_endpoints2.default).forEach(function (endpoint) {
  Ebay[endpoint] = function () {
    return Ebay.create()[endpoint]();
  };

  Ebay.prototype[endpoint] = function () {
    return Ebay.serviceName(endpoint);
  };
});

_fields2.default.forEach(function (field) {
  Ebay[field] = function (val) {
    return Ebay.create()[field](val);
  };

  Ebay.prototype[field] = function (val) {
    return Ebay.Request.create(this)[field](val);
  };
});

_globals2.default.forEach(function (global) {
  Ebay[global] = function (val) {
    return Ebay.create()[global](val);
  };

  Ebay.prototype[global] = function (val) {
    var cloned = _Immutable2.default.merge(this.globals, _defineProperty({}, global, val));
    return Ebay.create(cloned);
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9FYmF5LmpzIl0sIm5hbWVzIjpbIkViYXkiLCJzZXR0aW5ncyIsImNyZWF0ZSIsImF1dGhUb2tlbiIsInByb2Nlc3MiLCJlbnYiLCJFQkFZX1RPS0VOIiwiRW52X0Vycm9yIiwiY2VydCIsIkVCQVlfQ0VSVCIsImFwcCIsIkVCQVlfQVBQX0lEIiwiZGV2TmFtZSIsIkVCQVlfREVWX0lEIiwic2FuZGJveCIsIkVCQVlfU0FOREJPWCIsImFwaXYiLCJBUElfVkVSU0lPTiIsImdsb2JhbHMiLCJtZXJnZSIsImRlZmF1bHRzIiwiT2JqZWN0IiwiZnJlZXplIiwiY29uc29sZSIsIndhcm4iLCJydW4iLCJFcnJvciIsInNlcnZpY2VOYW1lIiwic2l0ZSIsInJhdyIsInBlclBhZ2UiLCJSZXF1ZXN0IiwiZm9yRWFjaCIsInZlcmIiLCJwcm90b3R5cGUiLCJrZXlzIiwiZW5kcG9pbnQiLCJmaWVsZCIsInZhbCIsImdsb2JhbCIsImNsb25lZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFJQTs7O0FBSkE7Ozs7QUFDQTs7QUFDQTs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O0lBRXFCQSxJOzs7O0FBQ25COzs7OzsyQkFLZ0JDLFEsRUFBVztBQUN6QixhQUFPLElBQUlELElBQUosQ0FBVUMsUUFBVixDQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs4QkFNa0I7QUFDaEIsYUFBT0QsS0FBS0UsTUFBTCxDQUFZO0FBQ2ZDLG1CQUFZQyxRQUFRQyxHQUFSLENBQVlDLFVBQVosSUFBNEIsZUFBT0MsU0FBUCxDQUFpQixZQUFqQixDQUR6QjtBQUVmQyxjQUFZSixRQUFRQyxHQUFSLENBQVlJLFNBQVosSUFBNEIsZUFBT0YsU0FBUCxDQUFpQixXQUFqQixDQUZ6QjtBQUdmRyxhQUFZTixRQUFRQyxHQUFSLENBQVlNLFdBQVosSUFBNEIsZUFBT0osU0FBUCxDQUFpQixhQUFqQixDQUh6QjtBQUlmSyxpQkFBWVIsUUFBUUMsR0FBUixDQUFZUSxXQUFaLElBQTRCLGVBQU9OLFNBQVAsQ0FBaUIsYUFBakIsQ0FKekI7QUFLZk8saUJBQVlWLFFBQVFDLEdBQVIsQ0FBWVUsWUFBWixJQUE0QixLQUx6QjtBQU1mQyxjQUFZWixRQUFRQyxHQUFSLENBQVlZLFdBQVosSUFBNEI7QUFOekIsT0FBWixDQUFQO0FBUUQ7O0FBRUQ7Ozs7Ozs7OztBQU1BLGdCQUFjaEIsUUFBZCxFQUF5QjtBQUFBOztBQUN2Qjs7O0FBR0EsU0FBS2lCLE9BQUwsR0FBZ0Isb0JBQVVDLEtBQVYsQ0FBZ0JuQixLQUFLb0IsUUFBckIsRUFBK0JuQixRQUEvQixDQUFoQjtBQUNBOzs7O0FBSUFvQixXQUFPQyxNQUFQLENBQWMsS0FBS0osT0FBbkI7QUFDRDs7QUFFRDs7Ozs7Ozs7Ozs7OzZCQVFVO0FBQ1BLLGNBQVFDLElBQVIsQ0FBYSx1SEFBYjtBQUNELGFBQU8sS0FBS0MsR0FBTCxFQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7OzswQkFNTztBQUNMLHFCQUFPQyxLQUFQLENBQWEsa0VBQWI7QUFDRDs7Ozs7O0FBR0g7Ozs7O2tCQXJFcUIxQixJO0FBd0VyQkEsS0FBS29CLFFBQUwsR0FBZ0I7QUFDWk8sZUFBZSxTQURIO0FBRVpiLFdBQWUsS0FGSDtBQUdaYyxRQUFlLENBSEg7QUFJWkMsT0FBZSxLQUpILENBSWM7QUFKZCxJQUtaQyxTQUFlOztBQUduQjs7O0FBUmdCLENBQWhCLENBV0E5QixLQUFLK0IsT0FBTDs7QUFFQSxnQkFBTUMsT0FBTixDQUFlLGdCQUFRO0FBQ3JCaEMsT0FBS2lDLElBQUwsSUFBYSxZQUFZO0FBQ3ZCLFdBQU9qQyxLQUFLRSxNQUFMLEdBQWMrQixJQUFkLEdBQVA7QUFDRCxHQUZEOztBQUlBakMsT0FBS2tDLFNBQUwsQ0FBZUQsSUFBZixJQUF1QixZQUFZO0FBQ2pDLFdBQU9qQyxLQUFLK0IsT0FBTCxDQUFhN0IsTUFBYixDQUFxQixJQUFyQixFQUE0QitCLElBQTVCLEdBQVA7QUFDRCxHQUZEO0FBR0QsQ0FSRDs7QUFVQVosT0FBT2MsSUFBUCxzQkFBdUJILE9BQXZCLENBQWdDLG9CQUFZO0FBQzFDaEMsT0FBS29DLFFBQUwsSUFBaUIsWUFBWTtBQUMzQixXQUFPcEMsS0FBS0UsTUFBTCxHQUFja0MsUUFBZCxHQUFQO0FBQ0QsR0FGRDs7QUFJQXBDLE9BQUtrQyxTQUFMLENBQWVFLFFBQWYsSUFBMkIsWUFBWTtBQUN0QyxXQUFPcEMsS0FBSzJCLFdBQUwsQ0FBa0JTLFFBQWxCLENBQVA7QUFDQSxHQUZEO0FBSUQsQ0FURDs7QUFXQSxpQkFBT0osT0FBUCxDQUFnQixpQkFBUztBQUN2QmhDLE9BQUtxQyxLQUFMLElBQWMsVUFBV0MsR0FBWCxFQUFpQjtBQUM3QixXQUFPdEMsS0FBS0UsTUFBTCxHQUFjbUMsS0FBZCxFQUFzQkMsR0FBdEIsQ0FBUDtBQUNELEdBRkQ7O0FBSUF0QyxPQUFLa0MsU0FBTCxDQUFlRyxLQUFmLElBQXdCLFVBQVdDLEdBQVgsRUFBaUI7QUFDdkMsV0FBT3RDLEtBQUsrQixPQUFMLENBQWE3QixNQUFiLENBQXFCLElBQXJCLEVBQTRCbUMsS0FBNUIsRUFBb0NDLEdBQXBDLENBQVA7QUFDRCxHQUZEO0FBR0QsQ0FSRDs7QUFVQSxrQkFBUU4sT0FBUixDQUFpQixrQkFBVTtBQUN6QmhDLE9BQUt1QyxNQUFMLElBQWUsVUFBV0QsR0FBWCxFQUFpQjtBQUM5QixXQUFPdEMsS0FBS0UsTUFBTCxHQUFjcUMsTUFBZCxFQUF1QkQsR0FBdkIsQ0FBUDtBQUNELEdBRkQ7O0FBSUF0QyxPQUFLa0MsU0FBTCxDQUFlSyxNQUFmLElBQXlCLFVBQVdELEdBQVgsRUFBaUI7QUFDeEMsUUFBTUUsU0FBUyxvQkFBVXJCLEtBQVYsQ0FBZ0IsS0FBS0QsT0FBckIsc0JBQ1pxQixNQURZLEVBQ0ZELEdBREUsRUFBZjtBQUdBLFdBQU90QyxLQUFLRSxNQUFMLENBQWFzQyxNQUFiLENBQVA7QUFDRCxHQUxEO0FBTUQsQ0FYRCIsImZpbGUiOiJFYmF5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlcXVlc3QgICBmcm9tIFwiLi9SZXF1ZXN0XCJcbmltcG9ydCB7dGhyb3dzfSAgZnJvbSBcIi4vZXJyb3JzXCJcbmltcG9ydCBJbW11dGFibGUgZnJvbSBcIi4vdXRpbHMvSW1tdXRhYmxlXCJcblxuLy8gZHluYW1pYyBkZWZpbml0aW9ucyBhZ2dyZWdhdGVkIGZyb20gY3Jhd2xpbmcgRWJheVwicyBBUEkgZG9jc1xuaW1wb3J0IEVuZHBvaW50cyBmcm9tIFwiLi9kZWZpbml0aW9ucy9lbmRwb2ludHNcIlxuaW1wb3J0IEZpZWxkcyAgICBmcm9tIFwiLi9kZWZpbml0aW9ucy9maWVsZHNcIlxuaW1wb3J0IEdsb2JhbHMgICBmcm9tIFwiLi9kZWZpbml0aW9ucy9nbG9iYWxzXCJcbmltcG9ydCBWZXJicyAgICAgZnJvbSBcIi4vZGVmaW5pdGlvbnMvdmVyYnNcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFYmF5IHtcbiAgLyoqXG4gICAqIHB1cmUgY3JlYXRpb24gaW50ZXJmYWNlIHVzZWZ1bCBmb3IgaXRlcmF0aW9ucyBhbmQgb3RoZXIgcGxhY2VzIHdoZXJlIGNvbnRleHQgbWF5IGJlIGxvc3RcbiAgICpcbiAgICogQHJldHVybiAgICAge3RoaXN9ICBhIG5ldyBFYmF5IGluc3RhbmNlXG4gICAqL1xuICBzdGF0aWMgY3JlYXRlICggc2V0dGluZ3MgKSB7XG4gICAgcmV0dXJuIG5ldyBFYmF5KCBzZXR0aW5ncyApXG4gIH1cblxuICAvKipcbiAgICogTG9hZHMgY3JlZGVudGlhbHMgZnJvbSBgcHJvY2Vzcy5lbnZgXG4gICAqIFxuICAgKiBAcmV0dXJuIHt0aGlzfSAgICAgICAgICBhIG5ldyBFYmF5IGluc3RhbmNlXG4gICAqIEB0aHJvd3Mge0Vudl9FcnJvcn1cbiAgICovXG4gIHN0YXRpYyBmcm9tRW52ICgpIHtcbiAgICByZXR1cm4gRWJheS5jcmVhdGUoe1xuICAgICAgICBhdXRoVG9rZW4gOiBwcm9jZXNzLmVudi5FQkFZX1RPS0VOICAgfHwgdGhyb3dzLkVudl9FcnJvcihcIkVCQVlfVE9LRU5cIilcbiAgICAgICwgY2VydCAgICAgIDogcHJvY2Vzcy5lbnYuRUJBWV9DRVJUICAgIHx8IHRocm93cy5FbnZfRXJyb3IoXCJFQkFZX0NFUlRcIilcbiAgICAgICwgYXBwICAgICAgIDogcHJvY2Vzcy5lbnYuRUJBWV9BUFBfSUQgIHx8IHRocm93cy5FbnZfRXJyb3IoXCJFQkFZX0FQUF9JRFwiKVxuICAgICAgLCBkZXZOYW1lICAgOiBwcm9jZXNzLmVudi5FQkFZX0RFVl9JRCAgfHwgdGhyb3dzLkVudl9FcnJvcihcIkVCQVlfREVWX0lEXCIpXG4gICAgICAsIHNhbmRib3ggICA6IHByb2Nlc3MuZW52LkVCQVlfU0FOREJPWCB8fCBmYWxzZVxuICAgICAgLCBhcGl2ICAgICAgOiBwcm9jZXNzLmVudi5BUElfVkVSU0lPTiAgfHwgXCI3NzVcIlxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogXG4gICAqXG4gICAqIEBwYXJhbSAgICAgIHtPYmplY3R9ICBzZXR0aW5ncyB0aGUgZ2xvYmFsIHNldHRpbmdzXG4gICAqIEByZXR1cm4gICAgIHtFYmF5fVxuICAgKi9cbiAgY29uc3RydWN0b3IgKCBzZXR0aW5ncyApIHtcbiAgICAvKipcbiAgICAgKiBnbG9iYWwgc2V0dGluZ3MgZm9yIGFsbCBmb2xsb3dpbmcgRWJheSByZXF1ZXN0c1xuICAgICAqL1xuICAgIHRoaXMuZ2xvYmFscyAgPSBJbW11dGFibGUubWVyZ2UoRWJheS5kZWZhdWx0cywgc2V0dGluZ3MpXG4gICAgLyoqXG4gICAgICogaW5zdXJlIGFuIGVycm9yIGlzIHRocm93biBpZiBpbnRlcm5hbHMgYXJlIGNoYW5nZWRcbiAgICAgKiBhbGxvd3MgZm9yIGJldHRlciBhc3NlcnRpb25zIGFib3V0IHRoZSBzdGF0ZWZ1bG5lc3MgXG4gICAgICovXG4gICAgT2JqZWN0LmZyZWV6ZSh0aGlzLmdsb2JhbHMpXG4gIH1cblxuICAvKipcbiAgICogRGVwcmVjYXRlZCBpbiBmYXZvciBvZiBgRWJheS5wcm90b3R5cGUucnVuYFxuICAgKiBhZGRzIHRvIGRldmVsb3BlciBlcmdvbm9taWNzIGJ5IGFkZGluZyBhIHNlbnNpYmxlIGVycm9yXG4gICAqIFxuICAgKiBAZGVwcmVjYXRlZFxuICAgKiBAdGhyb3dzICAgICB7RXJyb3J9XG4gICAqIEByZXR1cm4gICAgICBudWxsXG4gICAqL1xuICBpbnZva2UgKCkge1xuICAgICBjb25zb2xlLndhcm4oXCJkZXByZWNhdGlvbiB3YXJuaW5nIDo6IHRoZSAuaW52b2tlKCkgbWV0aG9kIGhhcyBiZWVuIG1pZ3JhdGVkIHRvIC5ydW4oKSBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBuZXh0IG1ham9yIHJlbGVhc2VcIilcbiAgICByZXR1cm4gdGhpcy5ydW4oKVxuICB9XG5cbiAgLyoqXG4gICAqIGRldmVsb3BlciBlcmdvbm9taWMgZXJyb3IgdGhhdCBlbnN1cmVzIHdlIGhhdmUgYXQgbGVhc3QgZGVmaW5lZCB0aGUgdmVyYiB3ZSB3YW50IHRvIGF0dGVtcHRcbiAgICogXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBcbiAgICogQHJldHVybiBudWxsXG4gICAqL1xuICBydW4gKCkge1xuICAgIHRocm93cy5FcnJvcihcIkNhbm5vdCBydW4gYW4gZW1wdHkgUmVxdWVzdCwgcGxlYXNlIGRlZmluZSBhbiBlQmF5IHZlcmIgb3IgZmllbGRcIilcbiAgfVxufVxuXG4vKipcbiAqIGRlZmF1bHRzIGZvciBlQmF5IEFQSVxuICovXG5FYmF5LmRlZmF1bHRzID0ge1xuICAgIHNlcnZpY2VOYW1lICA6IFwiVHJhZGluZ1wiXG4gICwgc2FuZGJveCAgICAgIDogZmFsc2VcbiAgLCBzaXRlICAgICAgICAgOiAwXG4gICwgcmF3ICAgICAgICAgIDogZmFsc2UgICAgICAvLyByZXR1cm4gcmF3IFhNTCAtPiBKU09OIHJlc3BvbnNlIGZyb20gRWJheVxuICAsIHBlclBhZ2UgICAgICA6IDEwMFxufVxuXG4vKipcbiAqIHJlZmVyZW5jZSB0byB0aGUge1JlcXVlc3R9IGNsYXNzXG4gKi9cbkViYXkuUmVxdWVzdCA9IFJlcXVlc3RcblxuVmVyYnMuZm9yRWFjaCggdmVyYiA9PiB7XG4gIEViYXlbdmVyYl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIEViYXkuY3JlYXRlKClbdmVyYl0oKVxuICB9XG5cbiAgRWJheS5wcm90b3R5cGVbdmVyYl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIEViYXkuUmVxdWVzdC5jcmVhdGUoIHRoaXMgKVt2ZXJiXSgpXG4gIH1cbn0pXG5cbk9iamVjdC5rZXlzKEVuZHBvaW50cykuZm9yRWFjaCggZW5kcG9pbnQgPT4ge1xuICBFYmF5W2VuZHBvaW50XSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gRWJheS5jcmVhdGUoKVtlbmRwb2ludF0oKVxuICB9XG5cbiAgRWJheS5wcm90b3R5cGVbZW5kcG9pbnRdID0gZnVuY3Rpb24gKCkge1xuICAgcmV0dXJuIEViYXkuc2VydmljZU5hbWUoIGVuZHBvaW50IClcbiAgfVxuXG59KVxuXG5GaWVsZHMuZm9yRWFjaCggZmllbGQgPT4ge1xuICBFYmF5W2ZpZWxkXSA9IGZ1bmN0aW9uICggdmFsICkge1xuICAgIHJldHVybiBFYmF5LmNyZWF0ZSgpW2ZpZWxkXSggdmFsIClcbiAgfVxuXG4gIEViYXkucHJvdG90eXBlW2ZpZWxkXSA9IGZ1bmN0aW9uICggdmFsICkge1xuICAgIHJldHVybiBFYmF5LlJlcXVlc3QuY3JlYXRlKCB0aGlzIClbZmllbGRdKCB2YWwgKVxuICB9XG59KVxuXG5HbG9iYWxzLmZvckVhY2goIGdsb2JhbCA9PiB7XG4gIEViYXlbZ2xvYmFsXSA9IGZ1bmN0aW9uICggdmFsICkge1xuICAgIHJldHVybiBFYmF5LmNyZWF0ZSgpW2dsb2JhbF0oIHZhbCApXG4gIH1cblxuICBFYmF5LnByb3RvdHlwZVtnbG9iYWxdID0gZnVuY3Rpb24gKCB2YWwgKSB7XG4gICAgY29uc3QgY2xvbmVkID0gSW1tdXRhYmxlLm1lcmdlKHRoaXMuZ2xvYmFscywge1xuICAgICAgW2dsb2JhbF0gOiB2YWxcbiAgICB9KVxuICAgIHJldHVybiBFYmF5LmNyZWF0ZSggY2xvbmVkIClcbiAgfVxufSlcblxuIl19