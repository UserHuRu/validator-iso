# validator-iso
> Universal (a.k.a isomorphic) validator

### Install

```bash
$ npm i validator-iso
```

### How to Use

```js
function handler (errMsg) {
  console.log(errMsg)
}

var rules = [
  {
    field: 'name', // 字段名
    fieldDesc: '姓名', // 字段名描述
    re: /^[\u4e00-\u9fa5]{2,10}$/, // 正则验证
    message: '请填写中文名，长度为2~10个字符', // 错误提示
    isRequired: true, // 该字段是否必须验证
    callback: handler
  },
  {
    field: 'mobile', // 字段名
    fieldDesc: '手机号', // 字段名描述
    re: /^1\d{10}$/, // 正则验证
    message: '请填写正确的手机号', // 错误提示
    isRequired: true, // 该字段是否必须验证
    callback: handler
  }
]

var form = {
  name: '令狐冲',
  mobile: '13851795179'
}

validator = new Validator(rules)

if (validator.run(form)) {
  console.log('表单验证通过')
}
```

### API

TBD
