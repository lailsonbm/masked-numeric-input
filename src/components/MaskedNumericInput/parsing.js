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
  const isNegative = (opts.negativePrefix || opts.negativeSuffix) && (
    (opts.negativePrefix && coreString.startsWith(opts.negativePrefix)) ||
    (opts.negativeSuffix && coreString.endsWith(opts.negativeSuffix))
  )

  let sanitizedString = coreString
  if(isNegative) {
    const sanitizedStringStart = opts.negativePrefix.length
    const sanitizedStringEnd = coreString.length - opts.negativeSuffix.length
    sanitizedString = coreString.substring(sanitizedStringStart, sanitizedStringEnd)
  }
  sanitizedString = replaceAll(sanitizedString, opts.thousands, EMPTY_STRING)
    .replace(opts.decimal, PERIOD_STRING)

  const parsedNumber = opts.precision > 0 ?
    parseFloat(sanitizedString) :
    parseInt(sanitizedString, 10)

  if(isNumeric(parsedNumber)) {
    return isNegative ? -parsedNumber : parsedNumber
  } else {
    return null
  }
}

const isNumeric = (value) => !isNaN(value)

const replaceAll = (string, search, replacement) => {
  return string.split(search).join(replacement)
}
