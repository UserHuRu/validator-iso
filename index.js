const _ = require('lodash')
const PropTypes = require('prop-types')

// default callback
const cb = msg => message.error(msg)

class Validator {
  /**
   * 构造器
   * @param {array} rules 校验规则
   */
  constructor (rules = [], showAllErrors = false) {
    this.rules = rules
    this.showAllErrors = showAllErrors
  }

  /**
   * 校验
   * @param {object} form 需要校验的表单
   */
  validate (form) {
    // console.log(form)

    let result = true
    const fields = _.keys(form)

    for (let i = 0; i < fields.length; i++) {
      const field = fields[i]
      if (!this.showAllErrors && !result) break

      for (let j = 0; j < this.rules.length; j++) {
        let rule = this.rules[j]
        if (field !== rule.field) continue

        const { isRequired, fieldDesc, re, message, callback = cb} = rule
        const value = form[field]

        // 检查必要字段
        if (isRequired && !value) {
          callback(`${fieldDesc}不能为空`)
          result = false
          break
        }

        if (value && re && !re.test(value)) {
          callback(message)
          result = false
          break
        }

        if (value && re && re.test(value)) {
          callback('')
          break
        }
      }
    }

    return result
  }

  run (form) {
    return this.validate(form)
  }
}

Validator.propTypes = {
  rules: PropTypes.arrayOf(PropTypes.shape({
    field: PropTypes.string.isRequired,
    re: PropTypes.object.isRequired,
    message: PropTypes.string.isRequired,
    callback: PropTypes.func,
    isRequired: PropTypes.bool,
    fieldDesc: PropTypes.string
  }).isRequired).isRequired,
  showAllErrors: PropTypes.bool
}

exports.Validator = Validator