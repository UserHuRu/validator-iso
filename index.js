const keys = obj => {
  const k = []
  for (i in obj) {
    k.push(i)
  }
  return k
}

const defaultOptions = {
  through: false,
  callback: msg => console.error(msg)
}

class Validator {
  /**
   * 构造器
   * @param {array} rules 校验规则
   * @param {array} options 选项
   */
  constructor (rules = [], options) {
    this.rules = rules
    this.options = Object.assign(defaultOptions, options)
  }

  /**
   * 校验
   * @param {object} form 需要校验的表单
   */
  validate (form) {
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
          result = false
          break
        }

        if (value && re && !re.test(value)) {
          callback(message)
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
}
