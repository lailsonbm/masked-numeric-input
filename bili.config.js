module.exports = {
  input: 'src/components/MaskedNumericInput/index.vue',
  output: {
    format: 'umd',
    fileName: 'masked-numeric-input.min.js',
    moduleName: 'MaskedNumericInput',
    minify: true
  },
  plugins: {
    vue: {
      css: true
    }
  }
}
