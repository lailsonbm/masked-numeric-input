<template>
  <div id="app">
    <masked-numeric-input
      v-model="number"
      v-bind="format"
      @update="log('UPDATE', $event)"
      @input="log('INPUT', $event)"
      @change="log('CHANGE', $event)"
      @focus="log('FOCUS', $event)"
      @blur="log('BLUR', $event)"
      placeholder="Number here"
      style="text-align: right"
    />
    <br/>
    <br/>
    <button type="button" @click="setNumberTo(null)">Set value to null</button>
    <button type="button" @click="setNumberTo(undefined)">Set value to undefined</button>
    <br/>
    <button type="button" @click="setNumberTo(0)">Set value to 0</button>
    <button type="button" @click="setNumberTo(42)">Set value to 42</button>
    <button type="button" @click="setNumberTo(42.01)">Set value to 42.01</button>
    <button type="button" @click="setNumberTo(1234568.90)">Set value to 1234568.90</button>
    <br/>
    <button type="button" @click="setNumberTo('42')">Set value to "42"</button>
    <button type="button" @click="setNumberTo('42.01')">Set value to "42.01"</button>
    <button type="button" @click="setNumberTo('42a')">Set value to "42a"</button>
    <button type="button" @click="setNumberTo('42.01a')">Set value to "42.01a"</button>
    <br/>
    <br/>
    {{number}}
  </div>
</template>

<script>
  import MaskedNumericInput from '../src'

  export default {
    name: 'app',
    data: function() {
      return {
        number: 42000.01,
        format: {
          precision: 2,
          thousands: '.',
          decimal: ',',
          prefix: 'US$ ',
          suffix: ' #',
        }
      }
    },
    components: {
      'masked-numeric-input': MaskedNumericInput,
    },
    methods: {
      log: function(label, message) {
        console.log(label, message)
      },
      setNumberTo: function(number) {
        this.number = number
      },
    }
  }
</script>

<style scoped>
</style>
