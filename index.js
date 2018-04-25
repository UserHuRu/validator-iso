const keys = obj => {
  const k = []
  for (i in obj) {
    k.push(i)
  }
  return k
}

const defaultOptions = {
  through: false,
  callback: msg => console.log(msg)
}

class Validator {
  static mergeErrors () {
    let errors = {}

    for (let i = 0; i < arguments.length; i++) {
      errors = Object.assign(errors, arguments[i].errors() || {})
    }
    return errors
  }

  /**
   * 构造器
   * @param {array} rules 校验规则
   * @param {array} options 选项
   */
  constructor (rules = [], options) {
    this.rules = rules
    this.options = Object.assign(defaultOptions, options)
    this._errors = undefined
  }

  /**
   * 校验
   * @param {object} form 需要校验的表单
   */
  validate (form) {
    if (this._errors === undefined) this._errors = {}

    // console.log(form)
    const through = this.options.through
    let result = true
    const fields = keys(form)

    for (let i = 0; i < fields.length; i++) {
      const field = fields[i]
      if (!through && !result) break

      for (let j = 0; j < this.rules.length; j++) {
        let rule = this.rules[j]
        if (field !== rule.field) continue

        const { isRequired, fieldDesc, re, message, callback = this.options.callback } = rule
        const value = form[field]
        
        // 检查必要字段
        if (isRequired && !value) {
          callback(`${fieldDesc}不能为空`)
          this._errors[field] = `${fieldDesc}不能为空`
          result = false
          break
        }

        if (value && re && !re.test(value)) {
          callback(message)
          this._errors[field] = message
          result = false
          break
        }
      }
    }

    return result
  }

  run (form) {
    return this.validate(form)
  }

  errors () {
    return this._errors
  }
}
