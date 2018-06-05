# validator-iso
> Universal (a.k.a isomorphic) validator

### Install

```bash
$ npm i validator-iso
```

### Browser

```html
<script type="text/javascript" src="validator.min.js" ></script>
```

### Node.js

```js
const Validator = require('validator-iso')
```

### Basic Usage

```js
const validation = new Validator(rules [, Options]);
```

__rules__  {Array} - Validation rules

__Options__  {Object} - configs


```js
var rules = [
  {
    field: 'name', // 字段名
    fieldDesc: '姓名', // 字段名描述
    re: /^[\u4e00-\u9fa5]{2,10}$/, // 正则验证
    message: '请填写中文名，长度为2~10个字符', // 错误提示
    isRequired: true, // 该字段是否必须验证
    callback: handler // 该字段错误的回调
  },
  {
    field: 'mobile', // 字段名
    fieldDesc: '手机号', // 字段名描述
    re: /^1\d{10}$/, // 正则验证
    message: '请填写正确的手机号', // 错误提示
    isRequired: true, // 该字段是否必须验证
    callback: handler // 该字段错误的回调
  }
]

var options = {
  through: true, // 是否检测全部字段， 默认：false
  callback: function (errMsg) { // 字段检测失败时的回调函数 （注意：会被rules中定义的callback覆盖）
    console.log(errMsg)
  }
}

```

### Methods

__run(form)__  {Function} - 执行form的校验  返回true: form校验通过、false: form校验不通过

__errors()__  {Function} - 返回校验的结果：errors对象

__mergeErrors(validator1, validator2)__ {Function} - 返回合并后的两个Validator实例对象的errors。如果有需要的话~

### Example1

```js
function handler (errMsg) {
  console.log(errMsg)
}

var rules = [
  {
    field: 'name',
    fieldDesc: '姓名',
    re: /^[\u4e00-\u9fa5]{2,10}$/,
    message: '请填写中文名，长度为2~10个字符',
    isRequired: true,
    callback: handler
  },
  {
    field: 'mobile',
    fieldDesc: '手机号',
    re: /^1\d{10}$/,
    message: '请填写正确的手机号',
    isRequired: true,
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

### Example2

```js
let options = {
  through: true,
  callback: msg => console.error(`校验不通过：${msg}`)
}

var rules = [
  {
    field: 'name',
    fieldDesc: '姓名',
    re: /^[\u4e00-\u9fa5]{2,10}$/,
    message: '请填写中文名，长度为2~10个字符',
    isRequired: true
  },
  {
    field: 'mobile',
    fieldDesc: '手机号',
    re: /^1\d{10}$/,
    message: '请填写正确的手机号',
    isRequired: true
  },
  {
    field: 'email',
    fieldDesc: '邮箱',
    re: /^[.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
    message: '请输入正确的邮箱格式',
    isRequired: true
  }
]

var form = {
  name: '令狐冲',
  mobile: '',
  email: ''
}

const validator = new Validator(rules, options)

validator.run(form)

let errors = validator.errors()
console.log(errors) // { mobile: '手机号不能为空', email: '邮箱不能为空' } (注： 若through:false, errors={ mobile: '手机号不能为空' })
```

### Example3
```js
var rules1 = [
  {
    field: 'name',
    fieldDesc: '姓名',
    re: /^[\u4e00-\u9fa5]{2,10}$/,
    message: '请填写中文名，长度为2~10个字符',
    isRequired: true
  },
  {
    field: 'mobile',
    fieldDesc: '手机号',
    re: /^1\d{10}$/,
    message: '请填写正确的手机号',
    isRequired: true
  }
]

var rules2 = [
  {
    field: 'email',
    fieldDesc: '邮箱',
    re: /^[.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
    message: '请输入正确的邮箱格式'
  },
  {
    field: 'avatar',
    fieldDesc: '头像',
    isRequired: true,
  }
]

var form1 = {
  name: '',
  mobile: ''
}

var form2 = {
  email: '215937284@qq.com',
  avatar: ''
}

const validator1 = new Validator(rules1)
const validator2 = new Validator(rules2)

validator1.run(form1)
validator2.run(form2)

const errors = Validator.mergeErrors(validator1, validator2)
console.log('merge', errors) // { name: '姓名不能为空', avatar: '头像不能为空' }
```