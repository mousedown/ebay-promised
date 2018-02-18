"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bluebird = require("bluebird");

var _bluebird2 = _interopRequireDefault(_bluebird);

var _ecjson = require("ecjson");

var _ecjson2 = _interopRequireDefault(_ecjson);

var _errors = require("./errors");

var _Immutable = require("./utils/Immutable");

var _Immutable2 = _interopRequireDefault(_Immutable);

var _extraneous = require("./definitions/extraneous");

var _extraneous2 = _interopRequireDefault(_extraneous);

var _nodes = require("./definitions/nodes.date");

var _nodes2 = _interopRequireDefault(_nodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ITERABLE_KEY = /Array|List/;

/**
 * A collection of pure methods that are used to parse eBay API responses
 * should generally be bound to a Request via:
 *   `Function.prototype.bind`
 *   `Promise.prototype.bind`
 *  
 */

var Parser = function () {
  function Parser() {
    _classCallCheck(this, Parser);
  }

  _createClass(Parser, null, [{
    key: "toJSON",


    /**
     * converts an XML response to JSON
     *
     * @param      {XML}     xml     The xml
     * @return     {Promise}         resolves to a JSON representation of the HTML 
     */
    value: function toJSON(xml) {
      return new _bluebird2.default(function (resolve, reject) {
        _ecjson2.default.XmlToJson(xml, resolve);
      });
    }

    /**
     * unwraps a verb Response from eBay
     * must be verbed within the context of an {Ebay.Response}
     *
     * @param      {Call}    verb    The verb
     * @return     {Object}          The unwrapped verb
     */

  }, {
    key: "unwrap",
    value: function unwrap(req, json) {
      return Parser.flatten(json[req.responseWrapper]);
    }

    /**
     * Casts text representations to Javascript representations
     *
     * @param      {String}       value   The value
     * @return     {Date|Number}          The cast value
     */

  }, {
    key: "cast",
    value: function cast(value, key) {

      if (!isNaN(value) && value.charAt(0) != 0) return Number(value);

      if (value === "true") return true;

      if (value === "false") return false;

      if (typeof key === 'string' && _nodes2.default[key.toLowerCase()]) {
        return new Date(value);
      }

      return value;
    }

    /**
     * recursively flattens `value` keys in the XML -> JSON conversion
     * we can do this because we don't need to worry about XML attributes from eBay
     *
     * @param      {Object}  o       the object output from the XML parser
     * @return     {Object}          the flattened output
     */

  }, {
    key: "flatten",
    value: function flatten(o, key) {

      if (o.value) {
        return Parser.cast(o.value, key);
      }

      if (Array.isArray(o)) {
        return o.map(Parser.flatten);
      }

      if ((typeof o === "undefined" ? "undefined" : _typeof(o)) !== "object") {
        return Parser.cast(o, key);
      }

      return Object.keys(o).reduce(function (deflated, key) {
        deflated[key] = Parser.flatten(o[key], key);
        return deflated;
      }, {});
    }

    /**
     * flattens the eBay pagination object to be easier to deal with
     *
     * @param      {Object}  obj    the JSON representation of a Response
     * @return     {Object}         the friendly pagination extended Response
     */

  }, {
    key: "parsePagination",
    value: function parsePagination(obj) {
      if (!obj.PaginationResult) return {};

      var p = obj.PaginationResult;
      delete obj.PaginationResult;

      return { pagination: {
          pages: p.TotalNumberOfPages || 0,
          length: p.TotalNumberOfEntries || 0
        } };
    }
    /**
     * cleans the Ebay response up
     *
     * @param      {Object}  res     The response object
     * @return     {Object}  res     The cleaned response
     */

  }, {
    key: "clean",
    value: function clean(res) {

      if (res.Ack === "Error" || res.Ack === "Failure") {
        _errors.throws.Ebay_Api_Error(res.Errors);
      }

      // Drop extraneous keys
      res = Object.keys(res).filter(function (key) {
        return !~_extraneous2.default.indexOf(key);
      }).reduce(function (acc, key) {
        acc[key] = res[key];
        return acc;
      }, {});

      return Parser.fold(res);
    }

    /**
     * recursively folds a response from eBay into something reasonable
     *
     * @param      {Object}  res     The resource
     * @return     {Object}          The folded response
     */

  }, {
    key: "fold",
    value: function fold(res) {
      return Object.keys(res).reduce(function (cleaned, key) {
        var value = res[key];
        if (key.match(/List/)) {
          return _Immutable2.default.merge(cleaned, Parser.parsePagination(value), Parser.getList(value));
        }

        if (key.match(/Array/)) {
          return _Immutable2.default.merge(cleaned, Parser.getList(value));
        }

        cleaned[key] = value;
        return cleaned;
      }, {});
    }

    /**
     * Gets the List element from an eBay response
     *
     * @param      {<type>}  list    The list
     * @return     {Object}          The list.
     */

  }, {
    key: "getList",
    value: function getList(list) {
      var parent = Parser.getMatchingKey(list, "Array");
      var wrapper = Object.keys(parent)[0];
      var entries = parent[wrapper] || [];
      // Ensure we always have an Iterable interface for things that should be iterable
      return { results: Array.isArray(entries) ? entries : [entries] };
    }

    /**
     * Gets the matching key.
     *
     * @param      {<type>}  obj     The object
     * @param      {<type>}  substr  The substr to match
     * @return     {<type>}          The matching key.
     */

  }, {
    key: "getMatchingKey",
    value: function getMatchingKey(obj, substr) {
      var keys = Object.keys(obj);
      while (keys.length) {
        var key = keys.pop();
        if (~key.indexOf(substr)) return obj[key];
      }
      return obj;
    }
  }]);

  return Parser;
}();

exports.default = Parser;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9QYXJzZXIuanMiXSwibmFtZXMiOlsiSVRFUkFCTEVfS0VZIiwiUGFyc2VyIiwieG1sIiwicmVzb2x2ZSIsInJlamVjdCIsIlhtbFRvSnNvbiIsInJlcSIsImpzb24iLCJmbGF0dGVuIiwicmVzcG9uc2VXcmFwcGVyIiwidmFsdWUiLCJrZXkiLCJpc05hTiIsImNoYXJBdCIsIk51bWJlciIsInRvTG93ZXJDYXNlIiwiRGF0ZSIsIm8iLCJjYXN0IiwiQXJyYXkiLCJpc0FycmF5IiwibWFwIiwiT2JqZWN0Iiwia2V5cyIsInJlZHVjZSIsImRlZmxhdGVkIiwib2JqIiwiUGFnaW5hdGlvblJlc3VsdCIsInAiLCJwYWdpbmF0aW9uIiwicGFnZXMiLCJUb3RhbE51bWJlck9mUGFnZXMiLCJsZW5ndGgiLCJUb3RhbE51bWJlck9mRW50cmllcyIsInJlcyIsIkFjayIsIkViYXlfQXBpX0Vycm9yIiwiRXJyb3JzIiwiZmlsdGVyIiwiaW5kZXhPZiIsImFjYyIsImZvbGQiLCJjbGVhbmVkIiwibWF0Y2giLCJtZXJnZSIsInBhcnNlUGFnaW5hdGlvbiIsImdldExpc3QiLCJsaXN0IiwicGFyZW50IiwiZ2V0TWF0Y2hpbmdLZXkiLCJ3cmFwcGVyIiwiZW50cmllcyIsInJlc3VsdHMiLCJzdWJzdHIiLCJwb3AiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBLElBQU1BLGVBQWUsWUFBckI7O0FBRUE7Ozs7Ozs7O0lBT3FCQyxNOzs7Ozs7Ozs7QUFFbkI7Ozs7OzsyQkFNZ0JDLEcsRUFBTTtBQUNwQixhQUFPLHVCQUFhLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFvQjtBQUN0Qyx5QkFBT0MsU0FBUCxDQUFrQkgsR0FBbEIsRUFBdUJDLE9BQXZCO0FBQ0QsT0FGTSxDQUFQO0FBR0Q7O0FBRUQ7Ozs7Ozs7Ozs7MkJBT2dCRyxHLEVBQUtDLEksRUFBTztBQUMxQixhQUFP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aWxlIjoiUGFyc2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb21pc2UgICAgZnJvbSBcImJsdWViaXJkXCJcbmltcG9ydCBlY2pzb24gICAgIGZyb20gXCJlY2pzb25cIlxuaW1wb3J0IHt0aHJvd3N9ICAgZnJvbSBcIi4vZXJyb3JzXCJcbmltcG9ydCBJbW11dGFibGUgIGZyb20gXCIuL3V0aWxzL0ltbXV0YWJsZVwiXG5pbXBvcnQgRXh0cmFuZW91cyBmcm9tIFwiLi9kZWZpbml0aW9ucy9leHRyYW5lb3VzXCJcbmltcG9ydCBkYXRlTm9kZXMgIGZyb20gXCIuL2RlZmluaXRpb25zL25vZGVzLmRhdGVcIlxuXG5jb25zdCBJVEVSQUJMRV9LRVkgPSAvQXJyYXl8TGlzdC9cblxuLyoqXG4gKiBBIGNvbGxlY3Rpb24gb2YgcHVyZSBtZXRob2RzIHRoYXQgYXJlIHVzZWQgdG8gcGFyc2UgZUJheSBBUEkgcmVzcG9uc2VzXG4gKiBzaG91bGQgZ2VuZXJhbGx5IGJlIGJvdW5kIHRvIGEgUmVxdWVzdCB2aWE6XG4gKiAgIGBGdW5jdGlvbi5wcm90b3R5cGUuYmluZGBcbiAqICAgYFByb21pc2UucHJvdG90eXBlLmJpbmRgXG4gKiAgXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhcnNlciB7XG5cbiAgLyoqXG4gICAqIGNvbnZlcnRzIGFuIFhNTCByZXNwb25zZSB0byBKU09OXG4gICAqXG4gICAqIEBwYXJhbSAgICAgIHtYTUx9ICAgICB4bWwgICAgIFRoZSB4bWxcbiAgICogQHJldHVybiAgICAge1Byb21pc2V9ICAgICAgICAgcmVzb2x2ZXMgdG8gYSBKU09OIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBIVE1MIFxuICAgKi9cbiAgc3RhdGljIHRvSlNPTiAoIHhtbCApIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoIChyZXNvbHZlLCByZWplY3QpPT4ge1xuICAgICAgZWNqc29uLlhtbFRvSnNvbiggeG1sLCByZXNvbHZlIClcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIHVud3JhcHMgYSB2ZXJiIFJlc3BvbnNlIGZyb20gZUJheVxuICAgKiBtdXN0IGJlIHZlcmJlZCB3aXRoaW4gdGhlIGNvbnRleHQgb2YgYW4ge0ViYXkuUmVzcG9uc2V9XG4gICAqXG4gICAqIEBwYXJhbSAgICAgIHtDYWxsfSAgICB2ZXJiICAgIFRoZSB2ZXJiXG4gICAqIEByZXR1cm4gICAgIHtPYmplY3R9ICAgICAgICAgIFRoZSB1bndyYXBwZWQgdmVyYlxuICAgKi9cbiAgc3RhdGljIHVud3JhcCAoIHJlcSwganNvbiApIHtcbiAgICByZXR1cm4gUGFyc2VyLmZsYXR0ZW4oanNvblsgcmVxLnJlc3BvbnNlV3JhcHBlciBdKVxuICB9XG5cbiAgLyoqXG4gICAqIENhc3RzIHRleHQgcmVwcmVzZW50YXRpb25zIHRvIEphdmFzY3JpcHQgcmVwcmVzZW50YXRpb25zXG4gICAqXG4gICAqIEBwYXJhbSAgICAgIHtTdHJpbmd9ICAgICAgIHZhbHVlICAgVGhlIHZhbHVlXG4gICAqIEByZXR1cm4gICAgIHtEYXRlfE51bWJlcn0gICAgICAgICAgVGhlIGNhc3QgdmFsdWVcbiAgICovXG4gIHN0YXRpYyBjYXN0ICggdmFsdWUsIGtleSApIHtcbiAgICBcbiAgICBpZiAoIWlzTmFOKCB2YWx1ZSApICYmIHZhbHVlLmNoYXJBdCgwKSAhPSAwICkgcmV0dXJuIE51bWJlciggdmFsdWUgKVxuXG4gICAgaWYgKHZhbHVlID09PSBcInRydWVcIikgIHJldHVybiB0cnVlXG5cbiAgICBpZiAodmFsdWUgPT09IFwiZmFsc2VcIikgcmV0dXJuIGZhbHNlXG5cbiAgICBpZiAodHlwZW9mIGtleSA9PT0gJ3N0cmluZycgJiYgZGF0ZU5vZGVzW2tleS50b0xvd2VyQ2FzZSgpXSkge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlKCB2YWx1ZSApXG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cblxuICAvKipcbiAgICogcmVjdXJzaXZlbHkgZmxhdHRlbnMgYHZhbHVlYCBrZXlzIGluIHRoZSBYTUwgLT4gSlNPTiBjb252ZXJzaW9uXG4gICAqIHdlIGNhbiBkbyB0aGlzIGJlY2F1c2Ugd2UgZG9uJ3QgbmVlZCB0byB3b3JyeSBhYm91dCBYTUwgYXR0cmlidXRlcyBmcm9tIGVCYXlcbiAgICpcbiAgICogQHBhcmFtICAgICAge09iamVjdH0gIG8gICAgICAgdGhlIG9iamVjdCBvdXRwdXQgZnJvbSB0aGUgWE1MIHBhcnNlclxuICAgKiBAcmV0dXJuICAgICB7T2JqZWN0fSAgICAgICAgICB0aGUgZmxhdHRlbmVkIG91dHB1dFxuICAgKi9cbiAgc3RhdGljIGZsYXR0ZW4gKCBvLCBrZXkgKSB7XG5cbiAgICBpZiAoby52YWx1ZSkge1xuICAgICAgcmV0dXJuIFBhcnNlci5jYXN0KG8udmFsdWUsIGtleSlcbiAgICB9XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheSggbyApKSB7XG4gICAgICByZXR1cm4gby5tYXAoUGFyc2VyLmZsYXR0ZW4pXG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBvICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICByZXR1cm4gUGFyc2VyLmNhc3Qobywga2V5KVxuICAgIH1cblxuICAgIHJldHVybiBPYmplY3Qua2V5cyggbyApLnJlZHVjZSggKGRlZmxhdGVkLCBrZXkpPT4ge1xuICAgICAgZGVmbGF0ZWRba2V5XSA9IFBhcnNlci5mbGF0dGVuKG9ba2V5XSwga2V5KVxuICAgICAgcmV0dXJuIGRlZmxhdGVkXG4gICAgfSwge30pXG4gICAgXG4gIH1cblxuICAvKipcbiAgICogZmxhdHRlbnMgdGhlIGVCYXkgcGFnaW5hdGlvbiBvYmplY3QgdG8gYmUgZWFzaWVyIHRvIGRlYWwgd2l0aFxuICAgKlxuICAgKiBAcGFyYW0gICAgICB7T2JqZWN0fSAgb2JqICAgIHRoZSBKU09OIHJlcHJlc2VudGF0aW9uIG9mIGEgUmVzcG9uc2VcbiAgICogQHJldHVybiAgICAge09iamVjdH0gICAgICAgICB0aGUgZnJpZW5kbHkgcGFnaW5hdGlvbiBleHRlbmRlZCBSZXNwb25zZVxuICAgKi9cbiAgc3RhdGljIHBhcnNlUGFnaW5hdGlvbiAoIG9iaiApIHtcbiAgICBpZiAoIW9iai5QYWdpbmF0aW9uUmVzdWx0KSByZXR1cm4ge31cblxuICAgIGNvbnN0IHAgPSBvYmouUGFnaW5hdGlvblJlc3VsdFxuICAgIGRlbGV0ZSBvYmouUGFnaW5hdGlvblJlc3VsdFxuXG4gICAgcmV0dXJuIHsgcGFnaW5hdGlvbjoge1xuICAgICAgICBwYWdlcyAgOiBwLlRvdGFsTnVtYmVyT2ZQYWdlcyAgIHx8IDBcbiAgICAgICwgbGVuZ3RoIDogcC5Ub3RhbE51bWJlck9mRW50cmllcyB8fCAwXG4gICAgfX1cbiAgICBcbiAgfVxuICAvKipcbiAgICogY2xlYW5zIHRoZSBFYmF5IHJlc3BvbnNlIHVwXG4gICAqXG4gICAqIEBwYXJhbSAgICAgIHtPYmplY3R9ICByZXMgICAgIFRoZSByZXNwb25zZSBvYmplY3RcbiAgICogQHJldHVybiAgICAge09iamVjdH0gIHJlcyAgICAgVGhlIGNsZWFuZWQgcmVzcG9uc2VcbiAgICovXG4gIHN0YXRpYyBjbGVhbiAoIHJlcyApIHtcblxuICAgIGlmIChyZXMuQWNrID09PSBcIkVycm9yXCIgfHwgcmVzLkFjayA9PT0gXCJGYWlsdXJlXCIpIHtcbiAgICAgIHRocm93cy5FYmF5X0FwaV9FcnJvcihyZXMuRXJyb3JzKVxuICAgIH1cblxuICAgIC8vIERyb3AgZXh0cmFuZW91cyBrZXlzXG4gICAgcmVzID0gT2JqZWN0LmtleXMoIHJlcyApXG4gICAgICAuZmlsdGVyKCBrZXkgPT4gIX5FeHRyYW5lb3VzLmluZGV4T2YoIGtleSApIClcbiAgICAgIC5yZWR1Y2UoIChhY2MsIGtleSkgPT4ge1xuICAgICAgICBhY2Nba2V5XSA9IHJlc1trZXldXG4gICAgICAgIHJldHVybiBhY2NcbiAgICAgIH0sIHt9KVxuXG4gICByZXR1cm4gUGFyc2VyLmZvbGQocmVzKVxuICBcbiAgfVxuXG4gIC8qKlxuICAgKiByZWN1cnNpdmVseSBmb2xkcyBhIHJlc3BvbnNlIGZyb20gZUJheSBpbnRvIHNvbWV0aGluZyByZWFzb25hYmxlXG4gICAqXG4gICAqIEBwYXJhbSAgICAgIHtPYmplY3R9ICByZXMgICAgIFRoZSByZXNvdXJjZVxuICAgKiBAcmV0dXJuICAgICB7T2JqZWN0fSAgICAgICAgICBUaGUgZm9sZGVkIHJlc3BvbnNlXG4gICAqL1xuICBzdGF0aWMgZm9sZCAoIHJlcyApIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMocmVzKS5yZWR1Y2UoIGZ1bmN0aW9uIChjbGVhbmVkLCBrZXkpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gcmVzW2tleV1cbiAgICAgIGlmIChrZXkubWF0Y2goL0xpc3QvKSApIHtcbiAgICAgICAgcmV0dXJuIEltbXV0YWJsZS5tZXJnZShcbiAgICAgICAgICAgIGNsZWFuZWRcbiAgICAgICAgICAsIFBhcnNlci5wYXJzZVBhZ2luYXRpb24oIHZhbHVlIClcbiAgICAgICAgICAsIFBhcnNlci5nZXRMaXN0KCB2YWx1ZSApXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgaWYgKGtleS5tYXRjaCgvQXJyYXkvKSkge1xuICAgICAgICByZXR1cm4gSW1tdXRhYmxlLm1lcmdlKFxuICAgICAgICAgICAgY2xlYW5lZFxuICAgICAgICAgICwgUGFyc2VyLmdldExpc3QoIHZhbHVlIClcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICBjbGVhbmVkW2tleV0gPSB2YWx1ZVxuICAgICAgcmV0dXJuIGNsZWFuZWQgICAgICBcbiAgICB9LCB7fSlcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBMaXN0IGVsZW1lbnQgZnJvbSBhbiBlQmF5IHJlc3BvbnNlXG4gICAqXG4gICAqIEBwYXJhbSAgICAgIHs8dHlwZT59ICBsaXN0ICAgIFRoZSBsaXN0XG4gICAqIEByZXR1cm4gICAgIHtPYmplY3R9ICAgICAgICAgIFRoZSBsaXN0LlxuICAgKi9cbiAgc3RhdGljIGdldExpc3QgKGxpc3QpIHtcbiAgICBjb25zdCBwYXJlbnQgID0gUGFyc2VyLmdldE1hdGNoaW5nS2V5KGxpc3QsIFwiQXJyYXlcIilcbiAgICBjb25zdCB3cmFwcGVyID0gT2JqZWN0LmtleXMocGFyZW50KVswXVxuICAgIGNvbnN0IGVudHJpZXMgPSBwYXJlbnRbd3JhcHBlcl0gfHwgW11cbiAgICAvLyBFbnN1cmUgd2UgYWx3YXlzIGhhdmUgYW4gSXRlcmFibGUgaW50ZXJmYWNlIGZvciB0aGluZ3MgdGhhdCBzaG91bGQgYmUgaXRlcmFibGVcbiAgICByZXR1cm4geyByZXN1bHRzOiBBcnJheS5pc0FycmF5KGVudHJpZXMpID8gZW50cmllcyA6IFtlbnRyaWVzXSB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgbWF0Y2hpbmcga2V5LlxuICAgKlxuICAgKiBAcGFyYW0gICAgICB7PHR5cGU+fSAgb2JqICAgICBUaGUgb2JqZWN0XG4gICAqIEBwYXJhbSAgICAgIHs8dHlwZT59ICBzdWJzdHIgIFRoZSBzdWJzdHIgdG8gbWF0Y2hcbiAgICogQHJldHVybiAgICAgezx0eXBlPn0gICAgICAgICAgVGhlIG1hdGNoaW5nIGtleS5cbiAgICovXG4gIHN0YXRpYyBnZXRNYXRjaGluZ0tleSAob2JqLCBzdWJzdHIpIHtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob2JqKVxuICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgY29uc3Qga2V5ID0ga2V5cy5wb3AoKVxuICAgICAgaWYgKH5rZXkuaW5kZXhPZihzdWJzdHIpKSByZXR1cm4gb2JqW2tleV1cbiAgICB9XG4gICAgcmV0dXJuIG9ialxuICB9XG5cbn0iXX0=