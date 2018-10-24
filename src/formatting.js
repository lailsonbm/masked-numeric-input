const EMPTY_STRING = ''
const PERIOD_STRING = '.'
const ZERO_STRING = '0'
const NON_DIGITS_REGEX = /[^0-9]/g
const THOUSANDS_LENGTH = 3

export const formatNumber = (number, opts) => {
  const numberAsString = number.toFixed(opts.precision)
  let integerString, decimalString, decimalSeparator

  if(opts.precision > 0) {
    integerString = numberAsString.substring(0, numberAsString.length - opts.precision - 1)
    decimalString = numberAsString.substring(numberAsString.length - opts.precision, numberAsString.length)
    decimalSeparator = opts.decimal
  } else {
    integerString = numberAsString
    decimalString = EMPTY_STRING
    decimalSeparator = EMPTY_STRING
  }

  const formattedIntegerString = formatIntegerString(integerString, opts.thousands)
  return opts.prefix + formattedIntegerString + decimalSeparator + decimalString + opts.suffix
}

export const formatString = (string, opts) => {
  if(string === null || string === undefined || string === EMPTY_STRING) {
    return string
  }

  let sanitizedString = string.replace(NON_DIGITS_REGEX, EMPTY_STRING)
  sanitizedString = removeLeadingZeroes(sanitizedString)

  const length = sanitizedString.length
  let decimalString, integerString, formattedString

  if(opts.precision > 0) {
    decimalString = sanitizedString.substring(length - opts.precision)
    if(length > opts.precision) {
      integerString = sanitizedString.substring(0, length - opts.precision)
    } else {
      decimalString = padString(sanitizedString, opts.precision)
      integerString = ZERO_STRING
    }
    formattedString = opts.decimal + decimalString
  } else {
    integerString = sanitizedString
    formattedString = EMPTY_STRING
  }

  const formattedIntegerString = formatIntegerString(integerString, opts.thousands)
  return opts.prefix + formattedIntegerString + formattedString + opts.suffix
}

export const padString = (string, length) => {
  let paddedString = string
  while(paddedString.length < length) {
    paddedString = ZERO_STRING + paddedString
  }
  return paddedString
}

const formatIntegerString = (string, separator) => {
  let remainingLength = string.length
  let formattedString = ''

  while(remainingLength > THOUSANDS_LENGTH) {
    formattedString = separator + string.substring(remainingLength - THOUSANDS_LENGTH, remainingLength) + formattedString
    remainingLength -= THOUSANDS_LENGTH
  }

  return string.substring(0, remainingLength) + formattedString
}

const removeLeadingZeroes = (string) => {
  let sanitizedString = string
  while(sanitizedString.startsWith(ZERO_STRING) && sanitizedString.length > 1) {
    sanitizedString = sanitizedString.substring(1)
  }
  return sanitizedString
}
