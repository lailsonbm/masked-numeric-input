<template>
  <input
    type="tel"
    v-on="listeners"
    :value="formattedValue"
  />
</template>

<script>
  import defaults from './defaults'
  import {
    parseNumber,
    parseFormattedNumber,
  } from './parsing'
  import {
    formatNumber,
    formatString,
  } from './formatting'
  import { setCursor } from './utils'

  const PLUS_SIGN = '+'
  const MINUS_SIGN = '-'

  export default {
    name: 'masked-numeric-input',
    props: {
      value: {
        required: false,
        type: [Number, String],
      },
      precision: {
        type: Number,
        default: () => defaults.precision,
      },
      decimal: {
        type: String,
        default: () => defaults.decimal,
      },
      thousands: {
        type: String,
        default: () => defaults.thousands,
      },
      prefix: {
        type: String,
        default: () => defaults.prefix,
      },
      suffix: {
        type: String,
        default: () => defaults.suffix,
      },
      negativePrefix: {
        type: String,
        default: () => defaults.negativePrefix,
      },
      negativeSuffix: {
        type: String,
        default: () => defaults.negativeSuffix,
      }
    },
    model: {
      event: 'update',
    },
    data: function() {
      return {
        formattedValue: null,
      }
    },
    computed: {
      listeners: function() {
        return {
          ...this.$listeners,
          input: this.handleInput,
        }
      }
    },
    methods: {
      handleInput: function(event) {
        let isNegative = this.value < 0
        if(this.value && event.data === PLUS_SIGN) {
          isNegative = false
        } else if(this.value && event.data === MINUS_SIGN) {
          isNegative = true
        }

        const target = event.target
        const value = target.value
        const newFormattedValue = formatString(value, this.$props, isNegative)

        const positionFromEnd = value.length - target.selectionEnd
        target.value = newFormattedValue

        const totalPrefixLength = this.$props.prefix.length + this.$props.negativePrefix.length
        const totalSuffixLength = this.$props.suffix.length + this.$props.negativeSuffix.length
        let newPositionFromEnd = Math.max(positionFromEnd, totalSuffixLength)
        newPositionFromEnd = newFormattedValue.length - newPositionFromEnd
        newPositionFromEnd = Math.max(newPositionFromEnd, totalPrefixLength + 1)
        setCursor(target, newPositionFromEnd)

        if(this.formattedValue !== newFormattedValue) {
          this.formattedValue = newFormattedValue

          const parsedValue = parseFormattedNumber(newFormattedValue, this.$props)
          this.$emit('update', parsedValue)
          this.$emit('input', event)
        }
      },
    },
    watch: {
      value: {
        immediate: true,
        handler: function(value) {
          const parsedValue = parseNumber(value, this.$props)
          if(parsedValue !== null && parsedValue !== undefined) {
            this.formattedValue = formatNumber(parsedValue, this.$props)
          } else {
            this.formattedValue = ''
          }
          if(value !== parsedValue) {
            this.$emit('update', parsedValue)
          }
        },
      }
    },
  }
</script>
