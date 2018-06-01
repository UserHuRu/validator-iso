(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Validator = f()}})(function(){var define,module,exports;
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var keys = function keys(obj) {
  var k = [];
  for (i in obj) {
    k.push(i);
  }
  return k;
};

var defaultOptions = {
  through: false,
  callback: function callback(msg) {
    return console.log(msg);
  }
};

var Validator = function () {
  _createClass(Validator, null, [{
    key: "mergeErrors",
    value: function mergeErrors() {
      var errors = {};

      for (var _i = 0; _i < arguments.length; _i++) {
        errors = Object.assign(errors, arguments[_i].errors() || {});
      }
      return errors;
    }

    /**
     * 构造器
     * @param {array} rules 校验规则
     * @param {array} options 选项
     */

  }]);

  function Validator() {
    var rules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var options = arguments[1];

    _classCallCheck(this, Validator);

    this.rules = rules;
    this.options = Object.assign(defaultOptions, options);
    this._errors = undefined;
    this._form = undefined;
  }

  /**
   * 校验
   * @param {object} form 需要校验的表单
   */


  _createClass(Validator, [{
    key: "validate",
    value: function validate(form) {
      // 没有什么用，就是存一下，以便查询导致校验不通过的字段输入
      this._form = form;
      // 清空已有的 errors
      this._errors = {};

      // console.log(form)
      var through = this.options.through;
      var result = true;
      var fields = keys(form);

      for (var _i2 = 0; _i2 < fields.length; _i2++) {
        var field = fields[_i2];
        if (!through && !result) break;

        for (var j = 0; j < this.rules.length; j++) {
          var rule = this.rules[j];
          if (field !== rule.field) continue;

          var isRequired = rule.isRequired,
              fieldDesc = rule.fieldDesc,
              re = rule.re,
              _rule$message = rule.message,
              message = _rule$message === undefined ? " " + fieldDesc + "\u683C\u5F0F\u4E0D\u6B63\u786E" : _rule$message,
              _rule$callback = rule.callback,
              callback = _rule$callback === undefined ? this.options.callback : _rule$callback;

          var value = form[field];

          // 检查必要字段
          if (isRequired && !value) {
            callback(fieldDesc + "\u4E0D\u80FD\u4E3A\u7A7A");
            this._errors[field] = fieldDesc + "\u4E0D\u80FD\u4E3A\u7A7A";
            result = false;
            break;
          }

          if (value && re && !re.test(value)) {
            callback(message);
            this._errors[field] = message;
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
  }, {
    key: "errors",
    value: function errors() {
      return this._errors;
    }
  }]);

  return Validator;
}();

return Validator
});
