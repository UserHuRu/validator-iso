# tiny-form-validator
> simple validator for the form

### Install

```bash
$ npm i tiny-form-validator
```

### How to Use

```
validator = new Validator(rules, showAllErrors)

validator.run(form)

```

## 配置参数 Options

### rules { Array }

验证规则配置

```
rules: [
  {
    field: 'name', // 字段名
    fieldDesc: '企业（团队）名称', // 字段名描述
    re: /^.{2,20}$/, // 正则验证
    message: '企业（团队）名称需要至少2个字符', // 错误提示
    isRequired: true, // 该字段是否必须验证
    callback: errMsg => console.log(errMsg) // 验证错误的回调函数
  }
  ...
]
```

### showAllErrors { Boole }

可选参数， 默认false。

true: 一次验证完所有字段。

false: 一个字段验证失败，则不再验证其他字段。


### form { Object }
```
{
  name: 'ruru.hu',
  email: '215937284@qq.com'
}
```

## API

### run(form)

