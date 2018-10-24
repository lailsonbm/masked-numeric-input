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
    padString,
  } from './formatting'
  import { setCursor } from './utils'

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
        const target = event.target
        const value = target.value
        const newFormattedValue = formatString(value, this.$props)

        const positionFromEnd = value.length - target.selectionEnd
        target.value = newFormattedValue

        let newPositionFromEnd = Math.max(positionFromEnd, this.$props.suffix.length)
        newPositionFromEnd = newFormattedValue.length - newPositionFromEnd
        newPositionFromEnd = Math.max(newPositionFromEnd, this.$props.prefix.length + 1)
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
        handler: function(value, oldValue) {
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
