const vue = require('rollup-plugin-vue')

module.exports = {
  banner: true,
  format: ['umd', 'umd-min'],
  moduleName: 'MaskedNumericInput',
  css: true,
  plugins: [
    vue({ css: true })
  ],
  outDir: 'lib'
}
