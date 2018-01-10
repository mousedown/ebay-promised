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

      if (!isNaN(value)) return Number(value);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9QYXJzZXIuanMiXSwibmFtZXMiOlsiSVRFUkFCTEVfS0VZIiwiUGFyc2VyIiwieG1sIiwicmVzb2x2ZSIsInJlamVjdCIsIlhtbFRvSnNvbiIsInJlcSIsImpzb24iLCJmbGF0dGVuIiwicmVzcG9uc2VXcmFwcGVyIiwidmFsdWUiLCJrZXkiLCJpc05hTiIsIk51bWJlciIsInRvTG93ZXJDYXNlIiwiRGF0ZSIsIm8iLCJjYXN0IiwiQXJyYXkiLCJpc0FycmF5IiwibWFwIiwiT2JqZWN0Iiwia2V5cyIsInJlZHVjZSIsImRlZmxhdGVkIiwib2JqIiwiUGFnaW5hdGlvblJlc3VsdCIsInAiLCJwYWdpbmF0aW9uIiwicGFnZXMiLCJUb3RhbE51bWJlck9mUGFnZXMiLCJsZW5ndGgiLCJUb3RhbE51bWJlck9mRW50cmllcyIsInJlcyIsIkFjayIsIkViYXlfQXBpX0Vycm9yIiwiRXJyb3JzIiwiZmlsdGVyIiwiaW5kZXhPZiIsImFjYyIsImZvbGQiLCJjbGVhbmVkIiwibWF0Y2giLCJtZXJnZSIsInBhcnNlUGFnaW5hdGlvbiIsImdldExpc3QiLCJsaXN0IiwicGFyZW50IiwiZ2V0TWF0Y2hpbmdLZXkiLCJ3cmFwcGVyIiwiZW50cmllcyIsInJlc3VsdHMiLCJzdWJzdHIiLCJwb3AiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBLElBQU1BLGVBQWUsWUFBckI7O0FBRUE7Ozs7Ozs7O0lBT3FCQyxNOzs7Ozs7Ozs7QUFFbkI7Ozs7OzsyQkFNZ0JDLEcsRUFBTTtBQUNwQixhQUFPLHVCQUFhLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFvQjtBQUN0Qyx5QkFBT0MsU0FBUCxDQUFrQkgsR0FBbEIsRUFBdUJDLE9BQXZCO0FBQ0QsT0FGTSxDQUFQO0FBR0Q7O0FBRUQ7Ozs7Ozs7Ozs7MkJBT2dCRyxHLEVBQUtDLEksRUFBTztBQUMxQixhQUFPTixPQUFPTyxP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ICAgIGZyb20gXCJibHVlYmlyZFwiXG5pbXBvcnQgZWNqc29uICAgICBmcm9tIFwiZWNqc29uXCJcbmltcG9ydCB7dGhyb3dzfSAgIGZyb20gXCIuL2Vycm9yc1wiXG5pbXBvcnQgSW1tdXRhYmxlICBmcm9tIFwiLi91dGlscy9JbW11dGFibGVcIlxuaW1wb3J0IEV4dHJhbmVvdXMgZnJvbSBcIi4vZGVmaW5pdGlvbnMvZXh0cmFuZW91c1wiXG5pbXBvcnQgZGF0ZU5vZGVzICBmcm9tIFwiLi9kZWZpbml0aW9ucy9ub2Rlcy5kYXRlXCJcblxuY29uc3QgSVRFUkFCTEVfS0VZID0gL0FycmF5fExpc3QvXG5cbi8qKlxuICogQSBjb2xsZWN0aW9uIG9mIHB1cmUgbWV0aG9kcyB0aGF0IGFyZSB1c2VkIHRvIHBhcnNlIGVCYXkgQVBJIHJlc3BvbnNlc1xuICogc2hvdWxkIGdlbmVyYWxseSBiZSBib3VuZCB0byBhIFJlcXVlc3QgdmlhOlxuICogICBgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmRgXG4gKiAgIGBQcm9taXNlLnByb3RvdHlwZS5iaW5kYFxuICogIFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXJzZXIge1xuXG4gIC8qKlxuICAgKiBjb252ZXJ0cyBhbiBYTUwgcmVzcG9uc2UgdG8gSlNPTlxuICAgKlxuICAgKiBAcGFyYW0gICAgICB7WE1MfSAgICAgeG1sICAgICBUaGUgeG1sXG4gICAqIEByZXR1cm4gICAgIHtQcm9taXNlfSAgICAgICAgIHJlc29sdmVzIHRvIGEgSlNPTiByZXByZXNlbnRhdGlvbiBvZiB0aGUgSFRNTCBcbiAgICovXG4gIHN0YXRpYyB0b0pTT04gKCB4bWwgKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKCAocmVzb2x2ZSwgcmVqZWN0KT0+IHtcbiAgICAgIGVjanNvbi5YbWxUb0pzb24oIHhtbCwgcmVzb2x2ZSApXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiB1bndyYXBzIGEgdmVyYiBSZXNwb25zZSBmcm9tIGVCYXlcbiAgICogbXVzdCBiZSB2ZXJiZWQgd2l0aGluIHRoZSBjb250ZXh0IG9mIGFuIHtFYmF5LlJlc3BvbnNlfVxuICAgKlxuICAgKiBAcGFyYW0gICAgICB7Q2FsbH0gICAgdmVyYiAgICBUaGUgdmVyYlxuICAgKiBAcmV0dXJuICAgICB7T2JqZWN0fSAgICAgICAgICBUaGUgdW53cmFwcGVkIHZlcmJcbiAgICovXG4gIHN0YXRpYyB1bndyYXAgKCByZXEsIGpzb24gKSB7XG4gICAgcmV0dXJuIFBhcnNlci5mbGF0dGVuKGpzb25bIHJlcS5yZXNwb25zZVdyYXBwZXIgXSlcbiAgfVxuXG4gIC8qKlxuICAgKiBDYXN0cyB0ZXh0IHJlcHJlc2VudGF0aW9ucyB0byBKYXZhc2NyaXB0IHJlcHJlc2VudGF0aW9uc1xuICAgKlxuICAgKiBAcGFyYW0gICAgICB7U3RyaW5nfSAgICAgICB2YWx1ZSAgIFRoZSB2YWx1ZVxuICAgKiBAcmV0dXJuICAgICB7RGF0ZXxOdW1iZXJ9ICAgICAgICAgIFRoZSBjYXN0IHZhbHVlXG4gICAqL1xuICBzdGF0aWMgY2FzdCAoIHZhbHVlLCBrZXkgKSB7XG4gICAgXG4gICAgaWYgKCFpc05hTiggdmFsdWUgKSkgICByZXR1cm4gTnVtYmVyKCB2YWx1ZSApXG5cbiAgICBpZiAodmFsdWUgPT09IFwidHJ1ZVwiKSAgcmV0dXJuIHRydWVcblxuICAgIGlmICh2YWx1ZSA9PT0gXCJmYWxzZVwiKSByZXR1cm4gZmFsc2VcblxuICAgIGlmICh0eXBlb2Yga2V5ID09PSAnc3RyaW5nJyAmJiBkYXRlTm9kZXNba2V5LnRvTG93ZXJDYXNlKCldKSB7XG4gICAgICByZXR1cm4gbmV3IERhdGUoIHZhbHVlIClcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIC8qKlxuICAgKiByZWN1cnNpdmVseSBmbGF0dGVucyBgdmFsdWVgIGtleXMgaW4gdGhlIFhNTCAtPiBKU09OIGNvbnZlcnNpb25cbiAgICogd2UgY2FuIGRvIHRoaXMgYmVjYXVzZSB3ZSBkb24ndCBuZWVkIHRvIHdvcnJ5IGFib3V0IFhNTCBhdHRyaWJ1dGVzIGZyb20gZUJheVxuICAgKlxuICAgKiBAcGFyYW0gICAgICB7T2JqZWN0fSAgbyAgICAgICB0aGUgb2JqZWN0IG91dHB1dCBmcm9tIHRoZSBYTUwgcGFyc2VyXG4gICAqIEByZXR1cm4gICAgIHtPYmplY3R9ICAgICAgICAgIHRoZSBmbGF0dGVuZWQgb3V0cHV0XG4gICAqL1xuICBzdGF0aWMgZmxhdHRlbiAoIG8sIGtleSApIHtcblxuICAgIGlmIChvLnZhbHVlKSB7XG4gICAgICByZXR1cm4gUGFyc2VyLmNhc3Qoby52YWx1ZSwga2V5KVxuICAgIH1cblxuICAgIGlmIChBcnJheS5pc0FycmF5KCBvICkpIHtcbiAgICAgIHJldHVybiBvLm1hcChQYXJzZXIuZmxhdHRlbilcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG8gIT09IFwib2JqZWN0XCIpIHtcbiAgICAgIHJldHVybiBQYXJzZXIuY2FzdChvLCBrZXkpXG4gICAgfVxuXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKCBvICkucmVkdWNlKCAoZGVmbGF0ZWQsIGtleSk9PiB7XG4gICAgICBkZWZsYXRlZFtrZXldID0gUGFyc2VyLmZsYXR0ZW4ob1trZXldLCBrZXkpXG4gICAgICByZXR1cm4gZGVmbGF0ZWRcbiAgICB9LCB7fSlcbiAgICBcbiAgfVxuXG4gIC8qKlxuICAgKiBmbGF0dGVucyB0aGUgZUJheSBwYWdpbmF0aW9uIG9iamVjdCB0byBiZSBlYXNpZXIgdG8gZGVhbCB3aXRoXG4gICAqXG4gICAqIEBwYXJhbSAgICAgIHtPYmplY3R9ICBvYmogICAgdGhlIEpTT04gcmVwcmVzZW50YXRpb24gb2YgYSBSZXNwb25zZVxuICAgKiBAcmV0dXJuICAgICB7T2JqZWN0fSAgICAgICAgIHRoZSBmcmllbmRseSBwYWdpbmF0aW9uIGV4dGVuZGVkIFJlc3BvbnNlXG4gICAqL1xuICBzdGF0aWMgcGFyc2VQYWdpbmF0aW9uICggb2JqICkge1xuICAgIGlmICghb2JqLlBhZ2luYXRpb25SZXN1bHQpIHJldHVybiB7fVxuXG4gICAgY29uc3QgcCA9IG9iai5QYWdpbmF0aW9uUmVzdWx0XG4gICAgZGVsZXRlIG9iai5QYWdpbmF0aW9uUmVzdWx0XG5cbiAgICByZXR1cm4geyBwYWdpbmF0aW9uOiB7XG4gICAgICAgIHBhZ2VzICA6IHAuVG90YWxOdW1iZXJPZlBhZ2VzICAgfHwgMFxuICAgICAgLCBsZW5ndGggOiBwLlRvdGFsTnVtYmVyT2ZFbnRyaWVzIHx8IDBcbiAgICB9fVxuICAgIFxuICB9XG4gIC8qKlxuICAgKiBjbGVhbnMgdGhlIEViYXkgcmVzcG9uc2UgdXBcbiAgICpcbiAgICogQHBhcmFtICAgICAge09iamVjdH0gIHJlcyAgICAgVGhlIHJlc3BvbnNlIG9iamVjdFxuICAgKiBAcmV0dXJuICAgICB7T2JqZWN0fSAgcmVzICAgICBUaGUgY2xlYW5lZCByZXNwb25zZVxuICAgKi9cbiAgc3RhdGljIGNsZWFuICggcmVzICkge1xuXG4gICAgaWYgKHJlcy5BY2sgPT09IFwiRXJyb3JcIiB8fCByZXMuQWNrID09PSBcIkZhaWx1cmVcIikge1xuICAgICAgdGhyb3dzLkViYXlfQXBpX0Vycm9yKHJlcy5FcnJvcnMpXG4gICAgfVxuXG4gICAgLy8gRHJvcCBleHRyYW5lb3VzIGtleXNcbiAgICByZXMgPSBPYmplY3Qua2V5cyggcmVzIClcbiAgICAgIC5maWx0ZXIoIGtleSA9PiAhfkV4dHJhbmVvdXMuaW5kZXhPZigga2V5ICkgKVxuICAgICAgLnJlZHVjZSggKGFjYywga2V5KSA9PiB7XG4gICAgICAgIGFjY1trZXldID0gcmVzW2tleV1cbiAgICAgICAgcmV0dXJuIGFjY1xuICAgICAgfSwge30pXG5cbiAgIHJldHVybiBQYXJzZXIuZm9sZChyZXMpXG4gIFxuICB9XG5cbiAgLyoqXG4gICAqIHJlY3Vyc2l2ZWx5IGZvbGRzIGEgcmVzcG9uc2UgZnJvbSBlQmF5IGludG8gc29tZXRoaW5nIHJlYXNvbmFibGVcbiAgICpcbiAgICogQHBhcmFtICAgICAge09iamVjdH0gIHJlcyAgICAgVGhlIHJlc291cmNlXG4gICAqIEByZXR1cm4gICAgIHtPYmplY3R9ICAgICAgICAgIFRoZSBmb2xkZWQgcmVzcG9uc2VcbiAgICovXG4gIHN0YXRpYyBmb2xkICggcmVzICkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhyZXMpLnJlZHVjZSggZnVuY3Rpb24gKGNsZWFuZWQsIGtleSkge1xuICAgICAgY29uc3QgdmFsdWUgPSByZXNba2V5XVxuICAgICAgaWYgKGtleS5tYXRjaCgvTGlzdC8pICkge1xuICAgICAgICByZXR1cm4gSW1tdXRhYmxlLm1lcmdlKFxuICAgICAgICAgICAgY2xlYW5lZFxuICAgICAgICAgICwgUGFyc2VyLnBhcnNlUGFnaW5hdGlvbiggdmFsdWUgKVxuICAgICAgICAgICwgUGFyc2VyLmdldExpc3QoIHZhbHVlIClcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICBpZiAoa2V5Lm1hdGNoKC9BcnJheS8pKSB7XG4gICAgICAgIHJldHVybiBJbW11dGFibGUubWVyZ2UoXG4gICAgICAgICAgICBjbGVhbmVkXG4gICAgICAgICAgLCBQYXJzZXIuZ2V0TGlzdCggdmFsdWUgKVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIGNsZWFuZWRba2V5XSA9IHZhbHVlXG4gICAgICByZXR1cm4gY2xlYW5lZCAgICAgIFxuICAgIH0sIHt9KVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIExpc3QgZWxlbWVudCBmcm9tIGFuIGVCYXkgcmVzcG9uc2VcbiAgICpcbiAgICogQHBhcmFtICAgICAgezx0eXBlPn0gIGxpc3QgICAgVGhlIGxpc3RcbiAgICogQHJldHVybiAgICAge09iamVjdH0gICAgICAgICAgVGhlIGxpc3QuXG4gICAqL1xuICBzdGF0aWMgZ2V0TGlzdCAobGlzdCkge1xuICAgIGNvbnN0IHBhcmVudCAgPSBQYXJzZXIuZ2V0TWF0Y2hpbmdLZXkobGlzdCwgXCJBcnJheVwiKVxuICAgIGNvbnN0IHdyYXBwZXIgPSBPYmplY3Qua2V5cyhwYXJlbnQpWzBdXG4gICAgY29uc3QgZW50cmllcyA9IHBhcmVudFt3cmFwcGVyXSB8fCBbXVxuICAgIC8vIEVuc3VyZSB3ZSBhbHdheXMgaGF2ZSBhbiBJdGVyYWJsZSBpbnRlcmZhY2UgZm9yIHRoaW5ncyB0aGF0IHNob3VsZCBiZSBpdGVyYWJsZVxuICAgIHJldHVybiB7IHJlc3VsdHM6IEFycmF5LmlzQXJyYXkoZW50cmllcykgPyBlbnRyaWVzIDogW2VudHJpZXNdIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBtYXRjaGluZyBrZXkuXG4gICAqXG4gICAqIEBwYXJhbSAgICAgIHs8dHlwZT59ICBvYmogICAgIFRoZSBvYmplY3RcbiAgICogQHBhcmFtICAgICAgezx0eXBlPn0gIHN1YnN0ciAgVGhlIHN1YnN0ciB0byBtYXRjaFxuICAgKiBAcmV0dXJuICAgICB7PHR5cGU+fSAgICAgICAgICBUaGUgbWF0Y2hpbmcga2V5LlxuICAgKi9cbiAgc3RhdGljIGdldE1hdGNoaW5nS2V5IChvYmosIHN1YnN0cikge1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvYmopXG4gICAgd2hpbGUgKGtleXMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBrZXkgPSBrZXlzLnBvcCgpXG4gICAgICBpZiAofmtleS5pbmRleE9mKHN1YnN0cikpIHJldHVybiBvYmpba2V5XVxuICAgIH1cbiAgICByZXR1cm4gb2JqXG4gIH1cblxufSJdfQ==