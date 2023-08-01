<script lang="ts">
import abstractComponent from '@/mixins/abstractComponent';
import { isNumber } from 'lodash';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  mixins: [abstractComponent],
  setup() {
    return {};
  },
  methods: {
    onInput($event: any) {
      let value = $event.target.value;
      switch (this.schema.inputType.toLowerCase()) {
        case 'number':
        case 'range':
          if (isNumber(parseFloat($event.target.value))) {
            value = parseFloat($event.target.value);
          }
          break;
      }
      this.value = value;
    }
  }
});
</script>
<template>
  <div class="my-textbox">
    <label for="sampleText">Label:</label>
    <input id="sampleText" type="text" name="sampleTextbox" @input="onInput" :value="value" />
  </div>
</template>
