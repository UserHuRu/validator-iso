const assert = require('assert')
const Validator = require('./dist/validator.js')

const rules = [
  {
    field: 'name', // 字段名
    fieldDesc: '姓名', // 字段名描述
    re: /^[\u4e00-\u9fa5]{2,10}$/, // 正则验证
    message: '请填写中文名，长度为2~10个字符', // 错误提示
    isRequired: true, // 该字段是否必须验证
    callback: function (errMsg) { // 验证错误的回调函数
      console.log(errMsg)
    }
  },
  {
    field: 'mobile', // 字段名
    fieldDesc: '手机号', // 字段名描述
    re: /^1\d{10}$/, // 正则验证
    message: '请填写正确的手机号', // 错误提示
    isRequired: true, // 该字段是否必须验证
  }
]

const validator = new Validator(rules, {
  callback: msg => console.error(`校验不通过：${msg}`)
})

assert.ok(validator.run({name: '令狐冲', mobile: '13851795179'}), '测试填写正确的情况')
assert.ok(!validator.run({name: '', mobile: '13851795179'}), '测试姓名为空情况')
assert.ok(!validator.run({name: '哥', mobile: '13851795179'}), '测试姓名填写不正确情况')
assert.ok(!validator.run({name: '令狐冲', mobile: '1380000111'}), '测试手机号填写不正确的情况')

const validator2 = new Validator(rules, {
  callback: msg => console.error(`校验不通过：${msg}`)
})

// 测试合并错误
validator.run({name: '', mobile: '13851795179'})
validator2.run({name: '令狐冲', mobile: ''})
const errors = Validator.mergeErrors(validator, validator2)
console.log(errors)
assert.ok(errors.name && errors.mobile, '测试手机号填写不正确的情况')