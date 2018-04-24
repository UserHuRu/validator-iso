const {transformFileSync} = require('babel-core')
const fs = require('fs')
const path = require('path')
const uglify = require('uglify-js')
const umd = require('umd')
const shell = require('shelljs')

shell.rm('-rf', 'dist')
shell.mkdir('-p', 'dist')

const result = transformFileSync(path.join(__dirname, './index.js'), {
  sourceType: "script",
  presets: [
    ["env", {
      "targets": {
        "browsers": ["last 2 versions", "safari >= 7"],
        "node": "8.9",
        "uglify": true
      },
      "modules": false,
      "include": ["es6.object.assign"],
      "debug": true,
    }]
  ]
})

const libName = 'Validator'
fs.writeFileSync(path.join(__dirname, './dist/validator.js'), umd(libName, result.code + `\n\nreturn ${libName}`))
fs.writeFileSync(path.join(__dirname, './dist/validator.min.js'), uglify.minify(umd(libName, result.code + `\n\nreturn ${libName}`)).code)
