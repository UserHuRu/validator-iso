const {transformFileSync} = require('babel-core')
const fs = require('fs')
const path = require('path')
const uglify = require('uglify-js')
const shell = require('shelljs')

shell.rm('-rf', 'dist')
shell.mkdir('-p', 'dist')

const result = transformFileSync(path.join(__dirname, './index.js'), {
  "presets": [
    ["env", {
      "targets": {
        "browsers": ["last 2 versions", "safari >= 7"],
        "node": "8.9",
        "uglify": true
      },
      "modules": "umd",
      "include": ["es6.object.assign"],
      "debug": true,
    }]
  ]
})

fs.writeFileSync(path.join(__dirname, './dist/validator.js'), result.code)
fs.writeFileSync(path.join(__dirname, './dist/validator.min.js'), uglify.minify(result.code).code)
