(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.index = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var keys = function keys(obj) {
    var k = [];
    for (i in obj) {
      k.push(i);
    }
    return k;
  };

  // default callback
  var cb = function cb(msg) {
    return console.log(msg);
  };

  var defaultOptions = {
    through: true
  };

  var Validator = function () {
    /**
     * 构造器
     * @param {array} rules 校验规则
     * @param {array} options 选项
     */
    function Validator() {
      var rules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var options = arguments[1];

      _classCallCheck(this, Validator);

      this.rules = rules;
      this.options = Object.assign(defaultOptions, options);
    }

    /**
     * 校验
     * @param {object} form 需要校验的表单
     */


    _createClass(Validator, [{
      key: "validate",
      value: function validate(form) {
        // console.log(form)
        var through = this.options.through;
        var result = true;
        var fields = keys(form);

        for (var _i = 0; _i < fields.length; _i++) {
          var field = fields[_i];
          if (!through && !result) break;

          for (var j = 0; j < this.rules.length; j++) {
            var rule = this.rules[j];
            if (field !== rule.field) continue;

            var isRequired = rule.isRequired,
                fieldDesc = rule.fieldDesc,
                re = rule.re,
                message = rule.message,
                _rule$callback = rule.callback,
                callback = _rule$callback === undefined ? cb : _rule$callback;

            var value = form[field];

            // 检查必要字段
            if (isRequired && !value) {
              callback(fieldDesc + "\u4E0D\u80FD\u4E3A\u7A7A");
              result = false;
              break;
            }

            if (value && re && !re.test(value)) {
              callback(message);
              result = false;
              break;
            }
          }
        }

        return result;
      }
    }, {
      key: "run",
      value: function run(form) {
        return this.validate(form);
      }
    }]);

    return Validator;
  }();

  exports.default = Validator;
});