"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

// Definitions


var _objectToXml = require("object-to-xml");

var _objectToXml2 = _interopRequireDefault(_objectToXml);

var _bluebird = require("bluebird");

var _bluebird2 = _interopRequireDefault(_bluebird);

var _requestPromise = require("request-promise");

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _debug = require("debug");

var _debug2 = _interopRequireDefault(_debug);

var _simpleRateLimiter = require("simple-rate-limiter");

var _simpleRateLimiter2 = _interopRequireDefault(_simpleRateLimiter);

var _errors = require("./errors");

var _Parser = require("./Parser");

var _Parser2 = _interopRequireDefault(_Parser);

var _range = require("./utils/range");

var _range2 = _interopRequireDefault(_range);

var _Immutable = require("./utils/Immutable");

var _Immutable2 = _interopRequireDefault(_Immutable);

var _fields = require("./definitions/fields");

var _fields2 = _interopRequireDefault(_fields);

var _endpoints = require("./definitions/endpoints");

var _endpoints2 = _interopRequireDefault(_endpoints);

var _verbs = require("./definitions/verbs");

var _verbs2 = _interopRequireDefault(_verbs);

var _globals = require("./definitions/globals");

var _globals2 = _interopRequireDefault(_globals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SANDBOX = "sandbox";
var second = 1000;
var minute = 60 * second;
var hour = 60 * minute;
var day = 24 * hour;
var PROD = "production";
var HEADING = 'xml version="1.0" encoding="utf-8"?';
var LIST = "List";
var LISTING = "Listing";
var log = (0, _debug2.default)("ebay:request");
/**
 * Immmutable request object for making eBay API verbs
 */

var Request = function () {
  _createClass(Request, null, [{
    key: "create",


    /**
     * pure creation interface.  
     * Generally not needed as the Ebay module delegates transparently to a Request instance
     *
     * @param      {Object}   state   The state
     * @return     {Request}  the new Request object
     * @example
     * 
     *   Ebay
     *    .create(config)
     *    .GetMyeBaySelling()
     *    .run()
     *    .then(handleSuccess)
     *    .catch(errors.Ebay_Api_Error, handleValidationError)
     *    .catch(handleAllOtherErrors)
     */
    value: function create(state) {
      return new Request(state);
    }

    /**
     * creates the new Request object
     *
     * @private
     * @param      {Object}  previous  The previous state
     */

  }]);

  function Request() {
    var previous = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Request);

    /**
     * internal immutable state
     */
    this.state = _Immutable2.default.copy(previous);
    /**
     * ensures fields are detectable
     */
    this.state.fields = this.state.fields || {};
    /**
     * ensures globals are detectable
     */
    this.state.globals = this.state.globals || {};

    /**
     * generates the headers for a request
     */
    this.headers = {
      "X-EBAY-API-CALL-NAME": this.verb,
      "X-EBAY-API-COMPATIBILITY-LEVEL": this.globals.apiv,
      "X-EBAY-API-CERT-NAME": this.globals.cert,
      "X-EBAY-API-SITEID": this.globals.site || 0,
      "X-EBAY-API-APP-NAME": this.globals.app || "node.js::ebay-promised"

    };
    Object.freeze(this.state);
    Object.freeze(this.headers);
  }

  /**
   * returns the URL of the Request
   *
   * @private
   * @return     {String}  the url
   */


  _createClass(Request, [{
    key: "xml",


    /**
     * returns the XML document for the request
     * 
     * @private
     * @param      {Object}  options  The options
     * @return     {String}           The XML string of the Request
     */
    value: function xml() {
      var _o2x;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


      var payload = this.fields;
      var listKey = this.listKey();

      if (listKey !== false) {
        payload[listKey] = _Immutable2.default.merge(payload[listKey], this.pagination(options.page));
      }

      return (0, _objectToXml2.default)((_o2x = {}, _defineProperty(_o2x, HEADING, null), _defineProperty(_o2x, this.xmlns, _Immutable2.default.merge(this.credentials, payload)), _o2x));
    }

    /**
     * convenience method for `tapping` the Request
     *
     * @param      {Function}  fn      The function to run
     */

  }, {
    key: "tap",
    value: function tap(fn) {
      fn.call(this, this);
      return this;
    }

    /**
     * determines if the Request uses a List and which key it is
     *
     * @private
     * @return     {string|false}   the key that is a List  
     */

  }, {
    key: "listKey",
    value: function listKey() {
      var fields = this.fieldKeys;
      while (fields.length) {
        var field = fields.pop();
        if (~field.indexOf(LISTING)) continue;
        if (~field.indexOf(LIST)) return field;
      }
      return false;
    }

    /**
     * generates a pagination Object
     *
     * @param      {number}  page    The page to fetch
     * @return     {Object}          The pagination representation
     */

  }, {
    key: "pagination",
    value: function pagination() {
      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      return {
        Pagination: {
          PageNumber: page,
          EntriesPerPage: this.globals.perPage
        }
      };
    }

    /**
     * alias for `run()`
     *
     * @deprecated
     * @return     {Promise<Object>}   resolves to the response 
     */

  }, {
    key: "invoke",
    value: function invoke() {
      console.warn("deprecation warning :: the .invoke() method has been migrated to .run() and will be removed in the next major release");
      return this.run();
    }

    /**
     * runs the HTTP Post to eBay
     *
     * @private
     * @param      {Object}   options  The options
     * @return     {Promise}           resolves to the response
     *
     */

  }, {
    key: "fetch",
    value: function fetch(options) {
      var _this = this;

      return new _bluebird2.default(function (resolve, reject) {
        Request.post({
          url: _this.endpoint,
          headers: _this.headers,
          body: _this.xml(options)
          // Hotfix for OpenSSL issue
          // https://github.com/openssl/openssl/pull/852
          // https://github.com/nodejs/node/issues/3692
          , agentOptions: {
            ciphers: 'ALL',
            secureProtocol: 'TLSv1_method'
          }
        }).once("limiter-exec", function (req) {
          req = _bluebird2.default.resolve(req).tap(log);

          // resolve to raw XML
          if (_this.globals.raw) {
            return req.then(resolve).catch(reject);
          }

          return req.then(_Parser2.default.toJSON).then(function (json) {
            return _Parser2.default.unwrap(_this, json);
          }).then(_Parser2.default.clean).then(resolve).catch(reject);
        });
      });
    }

    /**
     * runs the current Request 
     *
     * @param      {<type>}  options  The options
     * @return     {<type>}  { description_of_the_return_value }
     */

  }, {
    key: "run",
    value: function run() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!this.globals.authToken) _errors.throws.No_Auth_Token_Error();
      if (!this.verb) _errors.throws.No_Call_Error();

      return this.fetch(options).bind(this).then(this.schedule);
    }

    /**
     * schedules pagination requests
     * 
     * @private
     * @param      {Object}   first   The first response from the API
     * @return     {Promise}          resolves to the first resposne or the concatenated Responses
     */

  }, {
    key: "schedule",
    value: function schedule(first) {
      var _this2 = this;

      // we aren't handling pagination
      if (!first.pagination || first.pagination.pages < 2) return first;

      log("beginning pagination for [2.." + first.pagination.pages + "]");

      return _bluebird2.default.mapSeries((0, _range2.default)(2, first.pagination.pages), function (page) {
        return _this2.fetch({ page: page });
      }).then(function (results) {
        return results.reduce(function (all, result) {
          all.results = all.results.concat(result.results);
          return all;
        }, first);
      });
    }
  }, {
    key: "endpoint",
    get: function get() {
      var endpoint = _endpoints2.default[this.globals.serviceName][this.globals.sandbox ? SANDBOX : PROD];

      return endpoint ? endpoint : _errors.throws.Invalid_Endpoint(this);
    }

    /**
     * returns a copy of the internal globals
     *
     * @private
     * @return     {Object}  the globals
     */

  }, {
    key: "globals",
    get: function get() {
      return _Immutable2.default.copy(this.state.globals);
    }

    /**
     * returns an array of all the field names that have been added to the Request
     *
     * @private
     * @return     {Array<String>}  the array of names
     */

  }, {
    key: "fieldKeys",
    get: function get() {
      return Object.keys(this.fields);
    }

    /**
     * returns a copy of the Request's fields
     *
     * @private
     * @return     {Object}  the fields
     */

  }, {
    key: "fields",
    get: function get() {
      return _Immutable2.default.copy(this.state.fields);
    }

    /**
     * returns the expected name of XML node of a Request
     *
     * @private
     * @return     {String}  { description_of_the_return_value }
     */

  }, {
    key: "responseWrapper",
    get: function get() {
      return this.verb + "Response";
    }

    /**
     * returns the verb to use for this request
     *
     * @private
     * @return     {String}  the verb
     */

  }, {
    key: "verb",
    get: function get() {
      return this.state.verb;
    }

    /**
     * returns the auth token for this request
     * 
     * @private
     * @return     {String}  eBay Auth token
     */

  }, {
    key: "token",
    get: function get() {
      return this.globals.authToken;
    }

    /**
     * returns the XML structure for the SOAP auth
     * 
     * @private
     * @return     {Object}  the SOAP
     */

  }, {
    key: "credentials",
    get: function get() {
      return { RequesterCredentials: { eBayAuthToken: this.token } };
    }

    /**
     * returns the XML namespace
     * 
     * @private
     * @return     {String}  the XML namespace from the verb
     */

  }, {
    key: "xmlns",
    get: function get() {
      return this.verb + "Request xmlns=\"urn:ebay:apis:eBLBaseComponents\"";
    }
  }]);

  return Request;
}();

/**
 * 
 * Ebay ratelimits to 5000 verbs per day per default
 * 
 * source: https://go.developer.ebay.com/api-verb-limits
 * 
 * this can be reconfigured on load if you are using 
 * an approved compatible Application
 * 
 * @example
 *   Request.post.to(1.5million).per(DAY)
 * 
 */

exports.default = Request;
Request.RATELIMIT = {
  factor: 5000 / day * second // req/sec
};

Request.post = (0, _simpleRateLimiter2.default)(function EbayRequestSingleton() {
  return _requestPromise2.default.post.apply(_requestPromise2.default, arguments);
}).to(Math.floor(Request.RATELIMIT.factor * minute)).per(minute);

_verbs2.default.forEach(function (verb) {
  // cache
  var $verb = { verb: verb };

  Request.prototype[verb] = function requestCallSetter() {
    var cloned = _Immutable2.default.merge(this.state, $verb);
    return Request.create(cloned);
  };
});

_fields2.default.forEach(function (field) {
  Request.prototype[field] = function requestFieldSetter(val) {
    var cloned = _Immutable2.default.copy(this.state);
    cloned.fields[field] = val;
    return Request.create(cloned);
  };
});

Object.keys(_endpoints2.default).concat(_globals2.default).forEach(function (global) {
  Request.prototype[global] = function requestGlobalSetter(val) {
    _errors.throws.Setting_Error(global);
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9SZXF1ZXN0LmpzIl0sIm5hbWVzIjpbIlNBTkRCT1giLCJzZWNvbmQiLCJtaW51dGUiLCJob3VyIiwiZGF5IiwiUFJPRCIsIkhFQURJTkciLCJMSVNUIiwiTElTVElORyIsImxvZyIsIlJlcXVlc3QiLCJzdGF0ZSIsInByZXZpb3VzIiwiY29weSIsImZpZWxkcyIsImdsb2JhbHMiLCJoZWFkZXJzIiwidmVyYiIsImFwaXYiLCJjZXJ0Iiwic2l0ZSIsImFwcCIsIk9iamVjdCIsImZyZWV6ZSIsIm9wdGlvbnMiLCJwYXlsb2FkIiwibGlzdEtleSIsIm1lcmdlIiwicGFnaW5hdGlvbiIsInBhZ2UiLCJ4bWxucyIsImNyZWRlbnRpYWxzIiwiZm4iLCJjYWxsIiwiZmllbGRLZXlzIiwibGVuZ3RoIiwiZmllbGQiLCJwb3AiLCJpbmRleE9mIiwiUGFnaW5hdGlvbiIsIlBhZ2VOdW1iZXIiLCJFbnRyaWVzUGVyUGFnZSIsInBlclBhZ2UiLCJjb25zb2xlIiwid2FybiIsInJ1biIsInJlc29sdmUiLCJyZWplY3QiLCJwb3N0IiwidXJsIiwiZW5kcG9pbnQiLCJib2R5IiwieG1sIiwiYWdlbnRPcHRpb25zIiwiY2lwaGVycyIsInNlY3VyZVByb3RvY29sIiwib25jZSIsInJlcSIsInRhcCIsInJhdyIsInRoZW4iLCJjYXRjaCIsInRvSlNPTiIsInVud3JhcCIsImpzb24iLCJjbGVhbiIsImF1dGhUb2tlbiIsIk5vX0F1dGhfVG9rZW5fRXJyb3IiLCJOb19DYWxsX0Vycm9yIiwiZmV0Y2giLCJiaW5kIiwic2NoZWR1bGUiLCJmaXJzdCIsInBhZ2VzIiwibWFwU2VyaWVzIiwicmVzdWx0cyIsInJlZHVjZSIsImFsbCIsInJlc3VsdCIsImNvbmNhdCIsInNlcnZpY2VOYW1lIiwic2FuZGJveCIsIkludmFsaWRfRW5kcG9pbnQiLCJrZXlzIiwiUmVxdWVzdGVyQ3JlZGVudGlhbHMiLCJlQmF5QXV0aFRva2VuIiwidG9rZW4iLCJSQVRFTElNSVQiLCJmYWN0b3IiLCJFYmF5UmVxdWVzdFNpbmdsZXRvbiIsImFyZ3VtZW50cyIsInRvIiwiTWF0aCIsImZsb29yIiwicGVyIiwiZm9yRWFjaCIsIiR2ZXJiIiwicHJvdG90eXBlIiwicmVxdWVzdENhbGxTZXR0ZXIiLCJjbG9uZWQiLCJjcmVhdGUiLCJyZXF1ZXN0RmllbGRTZXR0ZXIiLCJ2YWwiLCJnbG9iYWwiLCJyZXF1ZXN0R2xvYmFsU2V0dGVyIiwiU2V0dGluZ19FcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFXQTs7O0FBWEE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsVUFBVSxTQUFoQjtBQUNBLElBQU1DLFNBQVUsSUFBaEI7QUFDQSxJQUFNQyxTQUFVLEtBQUtELE1BQXJCO0FBQ0EsSUFBTUUsT0FBVSxLQUFLRCxNQUFyQjtBQUNBLElBQU1FLE1BQVUsS0FBS0QsSUFBckI7QUFDQSxJQUFNRSxPQUFVLFlBQWhCO0FBQ0EsSUFBTUMsVUFBVSxxQ0FBaEI7QUFDQSxJQUFNQyxPQUFVLE1BQWhCO0FBQ0EsSUFBTUMsVUFBVSxTQUFoQjtBQUNBLElBQU1DLE1BQVUscUJBQU0sY0FBTixDQUFoQjtBQUNBOzs7O0lBR3FCQyxPOzs7OztBQUVuQjs7Ozs7Ozs7Ozs7Ozs7OzsyQkFnQmVDLEssRUFBTztBQUNwQixhQUFPLElBQUlELE9BQUosQ0FBWUMsS0FBWixDQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7OztBQU1BLHFCQUE4QjtBQUFBLFFBQWhCQyxRQUFnQix1RUFBTCxFQUFLOztBQUFBOztBQUM1Qjs7O0FBR0EsU0FBS0QsS0FBTCxHQUFzQixvQkFBVUUsSUFBVixDQUFlRCxRQUFmLENBQXRCO0FBQ0E7OztBQUdBLFNBQUtELEtBQUwsQ0FBV0csTUFBWCxHQUFzQixLQUFLSCxLQUFMLENBQVdHLE1BQVgsSUFBc0IsRUFBNUM7QUFDQTs7O0FBR0EsU0FB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LE1BQXJCO0FBQ0QsR0FGRDtBQUdELENBSkQiLCJmaWxlIjoiUmVxdWVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBvMnggICAgICAgICBmcm9tIFwib2JqZWN0LXRvLXhtbFwiXG5pbXBvcnQgUHJvbWlzZSAgICAgZnJvbSBcImJsdWViaXJkXCJcbmltcG9ydCByZXEgICAgICAgICBmcm9tIFwicmVxdWVzdC1wcm9taXNlXCJcbmltcG9ydCBkZWJ1ZyAgICAgICBmcm9tIFwiZGVidWdcIlxuaW1wb3J0IGxpbWl0ICAgICAgIGZyb20gXCJzaW1wbGUtcmF0ZS1saW1pdGVyXCJcblxuaW1wb3J0IHt0aHJvd3N9ICAgIGZyb20gXCIuL2Vycm9yc1wiXG5pbXBvcnQgUGFyc2VyICAgICAgZnJvbSBcIi4vUGFyc2VyXCJcbmltcG9ydCByYW5nZSAgICAgICBmcm9tIFwiLi91dGlscy9yYW5nZVwiXG5pbXBvcnQgSW1tdXRhYmxlICAgZnJvbSBcIi4vdXRpbHMvSW1tdXRhYmxlXCJcblxuLy8gRGVmaW5pdGlvbnNcbmltcG9ydCBGaWVsZHMgICAgICBmcm9tIFwiLi9kZWZpbml0aW9ucy9maWVsZHNcIlxuaW1wb3J0IEVuZHBvaW50cyAgIGZyb20gXCIuL2RlZmluaXRpb25zL2VuZHBvaW50c1wiXG5pbXBvcnQgVmVyYnMgICAgICAgZnJvbSBcIi4vZGVmaW5pdGlvbnMvdmVyYnNcIlxuaW1wb3J0IEdsb2JhbHMgICAgIGZyb20gXCIuL2RlZmluaXRpb25zL2dsb2JhbHNcIlxuXG5jb25zdCBTQU5EQk9YID0gXCJzYW5kYm94XCJcbmNvbnN0IHNlY29uZCAgPSAxMDAwXG5jb25zdCBtaW51dGUgID0gNjAgKiBzZWNvbmRcbmNvbnN0IGhvdXIgICAgPSA2MCAqIG1pbnV0ZVxuY29uc3QgZGF5ICAgICA9IDI0ICogaG91clxuY29uc3QgUFJPRCAgICA9IFwicHJvZHVjdGlvblwiXG5jb25zdCBIRUFESU5HID0gJ3htbCB2ZXJzaW9uPVwiMS4wXCIgZW5jb2Rpbmc9XCJ1dGYtOFwiPydcbmNvbnN0IExJU1QgICAgPSBcIkxpc3RcIlxuY29uc3QgTElTVElORyA9IFwiTGlzdGluZ1wiXG5jb25zdCBsb2cgICAgID0gZGVidWcoXCJlYmF5OnJlcXVlc3RcIilcbi8qKlxuICogSW1tbXV0YWJsZSByZXF1ZXN0IG9iamVjdCBmb3IgbWFraW5nIGVCYXkgQVBJIHZlcmJzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlcXVlc3Qge1xuXG4gIC8qKlxuICAgKiBwdXJlIGNyZWF0aW9uIGludGVyZmFjZS4gIFxuICAgKiBHZW5lcmFsbHkgbm90IG5lZWRlZCBhcyB0aGUgRWJheSBtb2R1bGUgZGVsZWdhdGVzIHRyYW5zcGFyZW50bHkgdG8gYSBSZXF1ZXN0IGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSAgICAgIHtPYmplY3R9ICAgc3RhdGUgICBUaGUgc3RhdGVcbiAgICogQHJldHVybiAgICAge1JlcXVlc3R9ICB0aGUgbmV3IFJlcXVlc3Qgb2JqZWN0XG4gICAqIEBleGFtcGxlXG4gICAqIFxuICAgKiAgIEViYXlcbiAgICogICAgLmNyZWF0ZShjb25maWcpXG4gICAqICAgIC5HZXRNeWVCYXlTZWxsaW5nKClcbiAgICogICAgLnJ1bigpXG4gICAqICAgIC50aGVuKGhhbmRsZVN1Y2Nlc3MpXG4gICAqICAgIC5jYXRjaChlcnJvcnMuRWJheV9BcGlfRXJyb3IsIGhhbmRsZVZhbGlkYXRpb25FcnJvcilcbiAgICogICAgLmNhdGNoKGhhbmRsZUFsbE90aGVyRXJyb3JzKVxuICAgKi9cbiAgc3RhdGljIGNyZWF0ZSAoc3RhdGUpIHtcbiAgICByZXR1cm4gbmV3IFJlcXVlc3Qoc3RhdGUpXG4gIH1cblxuICAvKipcbiAgICogY3JlYXRlcyB0aGUgbmV3IFJlcXVlc3Qgb2JqZWN0XG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSAgICAgIHtPYmplY3R9ICBwcmV2aW91cyAgVGhlIHByZXZpb3VzIHN0YXRlXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoIHByZXZpb3VzID0ge30gKSB7XG4gICAgLyoqXG4gICAgICogaW50ZXJuYWwgaW1tdXRhYmxlIHN0YXRlXG4gICAgICovXG4gICAgdGhpcy5zdGF0ZSAgICAgICAgICA9IEltbXV0YWJsZS5jb3B5KHByZXZpb3VzKVxuICAgIC8qKlxuICAgICAqIGVuc3VyZXMgZmllbGRzIGFyZSBkZXRlY3RhYmxlXG4gICAgICovXG4gICAgdGhpcy5zdGF0ZS5maWVsZHMgICA9IHRoaXMuc3RhdGUuZmllbGRzICB8fCB7fVxuICAgIC8qKlxuICAgICAqIGVuc3VyZXMgZ2xvYmFscyBhcmUgZGV0ZWN0YWJsZVxuICAgICAqL1xuICAgIHRoaXMuc3RhdGUuZ2xvYmFscyAgPSB0aGlzLnN0YXRlLmdsb2JhbHMgfHwge31cblxuICAgIC8qKlxuICAgICAqIGdlbmVyYXRlcyB0aGUgaGVhZGVycyBmb3IgYSByZXF1ZXN0XG4gICAgICovXG4gICAgdGhpcy5oZWFkZXJzID0ge1xuICAgICAgICBcIlgtRUJBWS1BUEktQ0FMTC1OQU1FXCIgICAgICAgICAgIDogdGhpcy52ZXJiXG4gICAgICAsIFwiWC1FQkFZLUFQSS1DT01QQVRJQklMSVRZLUxFVkVMXCIgOiB0aGlzLmdsb2JhbHMuYXBpdlxuICAgICAgLCBcIlgtRUJBWS1BUEktQ0VSVC1OQU1FXCIgICAgICAgICAgIDogdGhpcy5nbG9iYWxzLmNlcnRcbiAgICAgICwgXCJYLUVCQVktQVBJLVNJVEVJRFwiICAgICAgICAgICAgICA6IHRoaXMuZ2xvYmFscy5zaXRlIHx8IDBcbiAgICAgICwgXCJYLUVCQVktQVBJLUFQUC1OQU1FXCIgICAgICAgICAgICA6IHRoaXMuZ2xvYmFscy5hcHAgIHx8IFwibm9kZS5qczo6ZWJheS1wcm9taXNlZFwiXG4gICAgICBcbiAgICB9XG4gICAgT2JqZWN0LmZyZWV6ZSh0aGlzLnN0YXRlKVxuICAgIE9iamVjdC5mcmVlemUodGhpcy5oZWFkZXJzKVxuXG4gIH1cblxuICAvKipcbiAgICogcmV0dXJucyB0aGUgVVJMIG9mIHRoZSBSZXF1ZXN0XG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEByZXR1cm4gICAgIHtTdHJpbmd9ICB0aGUgdXJsXG4gICAqL1xuICBnZXQgZW5kcG9pbnQgKCkge1xuICAgIGNvbnN0IGVuZHBvaW50ID0gRW5kcG9pbnRzW3RoaXMuZ2xvYmFscy5zZXJ2aWNlTmFtZV1bIHRoaXMuZ2xvYmFscy5zYW5kYm94ID8gU0FOREJPWCA6IFBST0QgXVxuICAgIFxuICAgIHJldHVybiBlbmRwb2ludFxuICAgICAgPyBlbmRwb2ludFxuICAgICAgOiB0aHJvd3MuSW52YWxpZF9FbmRwb2ludCh0aGlzKVxuICB9XG5cbiAgLyoqXG4gICAqIHJldHVybnMgYSBjb3B5IG9mIHRoZSBpbnRlcm5hbCBnbG9iYWxzXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEByZXR1cm4gICAgIHtPYmplY3R9ICB0aGUgZ2xvYmFsc1xuICAgKi9cbiAgZ2V0IGdsb2JhbHMgKCkge1xuICAgIHJldHVybiBJbW11dGFibGUuY29weSh0aGlzLnN0YXRlLmdsb2JhbHMpXG4gIH1cblxuICAvKipcbiAgICogcmV0dXJucyBhbiBhcnJheSBvZiBhbGwgdGhlIGZpZWxkIG5hbWVzIHRoYXQgaGF2ZSBiZWVuIGFkZGVkIHRvIHRoZSBSZXF1ZXN0XG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEByZXR1cm4gICAgIHtBcnJheTxTdHJpbmc+fSAgdGhlIGFycmF5IG9mIG5hbWVzXG4gICAqL1xuICBnZXQgZmllbGRLZXlzICgpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5maWVsZHMpXG4gIH1cblxuICAvKipcbiAgICogcmV0dXJucyBhIGNvcHkgb2YgdGhlIFJlcXVlc3QncyBmaWVsZHNcbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHJldHVybiAgICAge09iamVjdH0gIHRoZSBmaWVsZHNcbiAgICovXG4gIGdldCBmaWVsZHMgKCkge1xuICAgIHJldHVybiBJbW11dGFibGUuY29weSh0aGlzLnN0YXRlLmZpZWxkcylcbiAgfVxuXG4gIC8qKlxuICAgKiByZXR1cm5zIHRoZSBleHBlY3RlZCBuYW1lIG9mIFhNTCBub2RlIG9mIGEgUmVxdWVzdFxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcmV0dXJuICAgICB7U3RyaW5nfSAgeyBkZXNjcmlwdGlvbl9vZl90aGVfcmV0dXJuX3ZhbHVlIH1cbiAgICovXG4gIGdldCByZXNwb25zZVdyYXBwZXIgKCkge1xuICAgIHJldHVybiBgJHt0aGlzLnZlcmJ9UmVzcG9uc2VgXG4gIH1cblxuICAvKipcbiAgICogcmV0dXJucyB0aGUgdmVyYiB0byB1c2UgZm9yIHRoaXMgcmVxdWVzdFxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcmV0dXJuICAgICB7U3RyaW5nfSAgdGhlIHZlcmJcbiAgICovXG4gIGdldCB2ZXJiICgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS52ZXJiXG4gIH1cblxuICAvKipcbiAgICogcmV0dXJucyB0aGUgYXV0aCB0b2tlbiBmb3IgdGhpcyByZXF1ZXN0XG4gICAqIFxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcmV0dXJuICAgICB7U3RyaW5nfSAgZUJheSBBdXRoIHRva2VuXG4gICAqL1xuICBnZXQgdG9rZW4gKCkge1xuICAgIHJldHVybiB0aGlzLmdsb2JhbHMuYXV0aFRva2VuXG4gIH1cblxuICAvKipcbiAgICogcmV0dXJucyB0aGUgWE1MIHN0cnVjdHVyZSBmb3IgdGhlIFNPQVAgYXV0aFxuICAgKiBcbiAgICogQHByaXZhdGVcbiAgICogQHJldHVybiAgICAge09iamVjdH0gIHRoZSBTT0FQXG4gICAqL1xuICBnZXQgY3JlZGVudGlhbHMgKCkge1xuICAgIHJldHVybiB7IFJlcXVlc3RlckNyZWRlbnRpYWxzOiB7IGVCYXlBdXRoVG9rZW46IHRoaXMudG9rZW4gfSB9XG4gIH1cblxuICAvKipcbiAgICogcmV0dXJucyB0aGUgWE1MIG5hbWVzcGFjZVxuICAgKiBcbiAgICogQHByaXZhdGVcbiAgICogQHJldHVybiAgICAge1N0cmluZ30gIHRoZSBYTUwgbmFtZXNwYWNlIGZyb20gdGhlIHZlcmJcbiAgICovXG4gIGdldCB4bWxucyAoKSB7XG4gICAgcmV0dXJuIGAke3RoaXMudmVyYn1SZXF1ZXN0IHhtbG5zPVwidXJuOmViYXk6YXBpczplQkxCYXNlQ29tcG9uZW50c1wiYFxuICB9XG5cbiAgLyoqXG4gICAqIHJldHVybnMgdGhlIFhNTCBkb2N1bWVudCBmb3IgdGhlIHJlcXVlc3RcbiAgICogXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSAgICAgIHtPYmplY3R9ICBvcHRpb25zICBUaGUgb3B0aW9uc1xuICAgKiBAcmV0dXJuICAgICB7U3RyaW5nfSAgICAgICAgICAgVGhlIFhNTCBzdHJpbmcgb2YgdGhlIFJlcXVlc3RcbiAgICovXG4gIHhtbCAob3B0aW9ucyA9IHt9KSB7XG5cbiAgICBjb25zdCBwYXlsb2FkICA9IHRoaXMuZmllbGRzXG4gICAgY29uc3QgbGlzdEtleSAgPSB0aGlzLmxpc3RLZXkoKVxuXG4gICAgaWYgKGxpc3RLZXkgIT09IGZhbHNlKSB7XG4gICAgICBwYXlsb2FkWyBsaXN0S2V5IF0gPSBJbW11dGFibGUubWVyZ2UoIFxuICAgICAgICAgIHBheWxvYWRbbGlzdEtleV1cbiAgICAgICAgLCB0aGlzLnBhZ2luYXRpb24ob3B0aW9ucy5wYWdlKSBcbiAgICAgIClcbiAgICB9XG5cbiAgICByZXR1cm4gbzJ4KHtcbiAgICAgICAgW0hFQURJTkddICAgIDogbnVsbFxuICAgICAgLCBbdGhpcy54bWxuc10gOiBJbW11dGFibGUubWVyZ2UodGhpcy5jcmVkZW50aWFscywgcGF5bG9hZClcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIGNvbnZlbmllbmNlIG1ldGhvZCBmb3IgYHRhcHBpbmdgIHRoZSBSZXF1ZXN0XG4gICAqXG4gICAqIEBwYXJhbSAgICAgIHtGdW5jdGlvbn0gIGZuICAgICAgVGhlIGZ1bmN0aW9uIHRvIHJ1blxuICAgKi9cbiAgdGFwIChmbikge1xuICAgIGZuLmNhbGwodGhpcywgdGhpcylcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyoqXG4gICAqIGRldGVybWluZXMgaWYgdGhlIFJlcXVlc3QgdXNlcyBhIExpc3QgYW5kIHdoaWNoIGtleSBpdCBpc1xuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcmV0dXJuICAgICB7c3RyaW5nfGZhbHNlfSAgIHRoZSBrZXkgdGhhdCBpcyBhIExpc3QgIFxuICAgKi9cbiAgbGlzdEtleSAoKSB7XG4gICAgY29uc3QgZmllbGRzID0gdGhpcy5maWVsZEtleXNcbiAgICB3aGlsZSAoZmllbGRzLmxlbmd0aCkge1xuICAgICAgY29uc3QgZmllbGQgPSBmaWVsZHMucG9wKClcbiAgICAgIGlmICh+ZmllbGQuaW5kZXhPZihMSVNUSU5HKSkgY29udGludWVcbiAgICAgIGlmICh+ZmllbGQuaW5kZXhPZihMSVNUKSkgcmV0dXJuIGZpZWxkXG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgLyoqXG4gICAqIGdlbmVyYXRlcyBhIHBhZ2luYXRpb24gT2JqZWN0XG4gICAqXG4gICAqIEBwYXJhbSAgICAgIHtudW1iZXJ9ICBwYWdlICAgIFRoZSBwYWdlIHRvIGZldGNoXG4gICAqIEByZXR1cm4gICAgIHtPYmplY3R9ICAgICAgICAgIFRoZSBwYWdpbmF0aW9uIHJlcHJlc2VudGF0aW9uXG4gICAqL1xuICBwYWdpbmF0aW9uIChwYWdlPTEpIHtcbiAgICByZXR1cm4geyAgXG4gICAgICBQYWdpbmF0aW9uOiB7XG4gICAgICAgICAgUGFnZU51bWJlciAgICAgOiBwYWdlXG4gICAgICAgICwgRW50cmllc1BlclBhZ2UgOiB0aGlzLmdsb2JhbHMucGVyUGFnZVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBhbGlhcyBmb3IgYHJ1bigpYFxuICAgKlxuICAgKiBAZGVwcmVjYXRlZFxuICAgKiBAcmV0dXJuICAgICB7UHJvbWlzZTxPYmplY3Q+fSAgIHJlc29sdmVzIHRvIHRoZSByZXNwb25zZSBcbiAgICovXG4gIGludm9rZSAoKSB7XG4gICAgY29uc29sZS53YXJuKFwiZGVwcmVjYXRpb24gd2FybmluZyA6OiB0aGUgLmludm9rZSgpIG1ldGhvZCBoYXMgYmVlbiBtaWdyYXRlZCB0byAucnVuKCkgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmV4dCBtYWpvciByZWxlYXNlXCIpXG4gICAgcmV0dXJuIHRoaXMucnVuKClcbiAgfVxuXG4gIC8qKlxuICAgKiBydW5zIHRoZSBIVFRQIFBvc3QgdG8gZUJheVxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0gICAgICB7T2JqZWN0fSAgIG9wdGlvbnMgIFRoZSBvcHRpb25zXG4gICAqIEByZXR1cm4gICAgIHtQcm9taXNlfSAgICAgICAgICAgcmVzb2x2ZXMgdG8gdGhlIHJlc3BvbnNlXG4gICAqXG4gICAqL1xuICBmZXRjaCAob3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSggKHJlc29sdmUsIHJlamVjdCk9PiB7XG4gICAgICBSZXF1ZXN0LnBvc3Qoe1xuICAgICAgICAgIHVybCAgICAgICA6IHRoaXMuZW5kcG9pbnRcbiAgICAgICAgLCBoZWFkZXJzICAgOiB0aGlzLmhlYWRlcnNcbiAgICAgICAgLCBib2R5ICAgICAgOiB0aGlzLnhtbChvcHRpb25zKVxuICAgICAgICAvLyBIb3RmaXggZm9yIE9wZW5TU0wgaXNzdWVcbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL29wZW5zc2wvb3BlbnNzbC9wdWxsLzg1MlxuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vbm9kZWpzL25vZGUvaXNzdWVzLzM2OTJcbiAgICAgICAgLCBhZ2VudE9wdGlvbnM6IHsgXG4gICAgICAgICAgICAgIGNpcGhlcnMgICAgICAgIDogJ0FMTCdcbiAgICAgICAgICAgICwgc2VjdXJlUHJvdG9jb2wgOiAnVExTdjFfbWV0aG9kJ1xuICAgICAgICAgIH1cbiAgICAgIH0pLm9uY2UoXCJsaW1pdGVyLWV4ZWNcIiwgIHJlcSA9PiB7XG4gICAgICAgIHJlcSA9IFByb21pc2VcbiAgICAgICAgICAucmVzb2x2ZShyZXEpXG4gICAgICAgICAgLnRhcChsb2cpXG5cbiAgICAgICAgLy8gcmVzb2x2ZSB0byByYXcgWE1MXG4gICAgICAgIGlmICh0aGlzLmdsb2JhbHMucmF3KSB7XG4gICAgICAgICAgcmV0dXJuIHJlcS50aGVuKHJlc29sdmUpLmNhdGNoKHJlamVjdClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXFcbiAgICAgICAgICAudGhlbihQYXJzZXIudG9KU09OKVxuICAgICAgICAgIC50aGVuKCBqc29uID0+IFBhcnNlci51bndyYXAodGhpcywganNvbikgKVxuICAgICAgICAgIC50aGVuKFBhcnNlci5jbGVhbilcbiAgICAgICAgICAudGhlbihyZXNvbHZlKVxuICAgICAgICAgIC5jYXRjaChyZWplY3QpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogcnVucyB0aGUgY3VycmVudCBSZXF1ZXN0IFxuICAgKlxuICAgKiBAcGFyYW0gICAgICB7PHR5cGU+fSAgb3B0aW9ucyAgVGhlIG9wdGlvbnNcbiAgICogQHJldHVybiAgICAgezx0eXBlPn0gIHsgZGVzY3JpcHRpb25fb2ZfdGhlX3JldHVybl92YWx1ZSB9XG4gICAqL1xuICBydW4gKG9wdGlvbnMgPSB7fSkge1xuICAgIGlmICggIXRoaXMuZ2xvYmFscy5hdXRoVG9rZW4gKSB0aHJvd3MuTm9fQXV0aF9Ub2tlbl9FcnJvcigpXG4gICAgaWYgKCAhdGhpcy52ZXJiICkgICAgICAgICAgICAgIHRocm93cy5Ob19DYWxsX0Vycm9yKClcblxuICAgIHJldHVybiB0aGlzXG4gICAgICAuZmV0Y2gob3B0aW9ucylcbiAgICAgIC5iaW5kKHRoaXMpXG4gICAgICAudGhlbih0aGlzLnNjaGVkdWxlKVxuICB9XG5cbiAgLyoqXG4gICAqIHNjaGVkdWxlcyBwYWdpbmF0aW9uIHJlcXVlc3RzXG4gICAqIFxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0gICAgICB7T2JqZWN0fSAgIGZpcnN0ICAgVGhlIGZpcnN0IHJlc3BvbnNlIGZyb20gdGhlIEFQSVxuICAgKiBAcmV0dXJuICAgICB7UHJvbWlzZX0gICAgICAgICAgcmVzb2x2ZXMgdG8gdGhlIGZpcnN0IHJlc3Bvc25lIG9yIHRoZSBjb25jYXRlbmF0ZWQgUmVzcG9uc2VzXG4gICAqL1xuICBzY2hlZHVsZSAoZmlyc3QpIHtcbiAgICAvLyB3ZSBhcmVuJ3QgaGFuZGxpbmcgcGFnaW5hdGlvblxuICAgIGlmICghZmlyc3QucGFnaW5hdGlvbiB8fCBmaXJzdC5wYWdpbmF0aW9uLnBhZ2VzIDwgMikgcmV0dXJuIGZpcnN0XG5cbiAgICBsb2coYGJlZ2lubmluZyBwYWdpbmF0aW9uIGZvciBbMi4uJHtmaXJzdC5wYWdpbmF0aW9uLnBhZ2VzfV1gKVxuICAgIFxuICAgIHJldHVybiBQcm9taXNlLm1hcFNlcmllcyhcbiAgICAgICAgcmFuZ2UoMiwgZmlyc3QucGFnaW5hdGlvbi5wYWdlcylcbiAgICAgICwgcGFnZSA9PiB0aGlzLmZldGNoKHsgcGFnZTogcGFnZSB9KVxuICAgICkudGhlbiggcmVzdWx0cyA9PiB7XG4gICAgICByZXR1cm4gcmVzdWx0cy5yZWR1Y2UoIChhbGwsIHJlc3VsdCkgPT4ge1xuICAgICAgICBhbGwucmVzdWx0cyA9IGFsbC5yZXN1bHRzLmNvbmNhdCggcmVzdWx0LnJlc3VsdHMgKVxuICAgICAgICByZXR1cm4gYWxsXG4gICAgICB9LCBmaXJzdClcbiAgICB9KVxuICB9XG59XG5cbi8qKlxuICogXG4gKiBFYmF5IHJhdGVsaW1pdHMgdG8gNTAwMCB2ZXJicyBwZXIgZGF5IHBlciBkZWZhdWx0XG4gKiBcbiAqIHNvdXJjZTogaHR0cHM6Ly9nby5kZXZlbG9wZXIuZWJheS5jb20vYXBpLXZlcmItbGltaXRzXG4gKiBcbiAqIHRoaXMgY2FuIGJlIHJlY29uZmlndXJlZCBvbiBsb2FkIGlmIHlvdSBhcmUgdXNpbmcgXG4gKiBhbiBhcHByb3ZlZCBjb21wYXRpYmxlIEFwcGxpY2F0aW9uXG4gKiBcbiAqIEBleGFtcGxlXG4gKiAgIFJlcXVlc3QucG9zdC50bygxLjVtaWxsaW9uKS5wZXIoREFZKVxuICogXG4gKi9cblxuUmVxdWVzdC5SQVRFTElNSVQgPSB7XG4gIGZhY3RvciA6ICggNTAwMCAvIGRheSApICogc2Vjb25kIC8vIHJlcS9zZWNcbn1cblxuUmVxdWVzdC5wb3N0ID0gbGltaXQoIGZ1bmN0aW9uIEViYXlSZXF1ZXN0U2luZ2xldG9uICgpIHsgcmV0dXJuIHJlcS5wb3N0KC4uLmFyZ3VtZW50cykgfSlcbiAgLnRvKCBNYXRoLmZsb29yKFJlcXVlc3QuUkFURUxJTUlULmZhY3RvciAqIG1pbnV0ZSkgKVxuICAucGVyKCBtaW51dGUgKVxuXG5WZXJicy5mb3JFYWNoKCB2ZXJiID0+IHtcbiAgLy8gY2FjaGVcbiAgY29uc3QgJHZlcmIgPSB7dmVyYjogdmVyYn1cbiAgXG4gIFJlcXVlc3QucHJvdG90eXBlW3ZlcmJdID0gZnVuY3Rpb24gcmVxdWVzdENhbGxTZXR0ZXIgKCkge1xuICAgIGNvbnN0IGNsb25lZCA9IEltbXV0YWJsZS5tZXJnZSh0aGlzLnN0YXRlLCAkdmVyYilcbiAgICByZXR1cm4gUmVxdWVzdC5jcmVhdGUoY2xvbmVkKVxuICB9XG59KVxuXG5GaWVsZHMuZm9yRWFjaCggZmllbGQgPT4ge1xuICBSZXF1ZXN0LnByb3RvdHlwZVtmaWVsZF0gPSBmdW5jdGlvbiByZXF1ZXN0RmllbGRTZXR0ZXIgKHZhbCkge1xuICAgIGNvbnN0IGNsb25lZCA9IEltbXV0YWJsZS5jb3B5KHRoaXMuc3RhdGUpXG4gICAgY2xvbmVkLmZpZWxkc1tmaWVsZF0gPSB2YWxcbiAgICByZXR1cm4gUmVxdWVzdC5jcmVhdGUoY2xvbmVkKVxuICB9XG59KVxuXG5PYmplY3Qua2V5cyhFbmRwb2ludHMpLmNvbmNhdChHbG9iYWxzKS5mb3JFYWNoKCBnbG9iYWwgPT4ge1xuICBSZXF1ZXN0LnByb3RvdHlwZVtnbG9iYWxdID0gZnVuY3Rpb24gcmVxdWVzdEdsb2JhbFNldHRlciAodmFsKSB7XG4gICAgdGhyb3dzLlNldHRpbmdfRXJyb3IoZ2xvYmFsKVxuICB9XG59KVxuIl19