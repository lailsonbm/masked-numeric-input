const EMPTY_STRING = ''
const PERIOD_STRING = '.'

export const parseNumber = (value, opts) => {
  if(value === null || value === undefined) {
    return value
  }

  const parsedNumber = opts.precision > 0 ?
    parseFloat(value) :
    parseInt(value, 10)

  return isNumeric(parsedNumber) ? parsedNumber : null
}

export const parseFormattedNumber = (string, opts) => {
  const coreString = string.substring(opts.prefix.length, string.length - opts.suffix.length)
  const sanitizedString = replaceAll(coreString, opts.thousands, EMPTY_STRING)
    .replace(opts.decimal, PERIOD_STRING)

  const parsedNumber = opts.precision > 0 ?
    parseFloat(sanitizedString) :
    parseInt(sanitizedString, 10)

  return isNumeric(parsedNumber) ? parsedNumber : null
}

const isNumeric = (value) => !isNaN(value)

const replaceAll = (string, search, replacement) => {
  return string.split(search).join(replacement)
}
