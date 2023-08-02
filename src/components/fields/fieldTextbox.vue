<script lang="ts">
import abstractComponent from '@/mixins/abstractComponent';
import { isNumber } from 'lodash';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Textbox',
  mixins: [abstractComponent],
  setup() {
    return {};
  },
  methods: {
    onInput(event: Event) {
      const target = event.target as HTMLInputElement;
      let value: string | number = target.value;
      switch (this.schema.inputType.toLowerCase()) {
        case 'number':
        case 'range':
          if (isNumber(parseFloat(target.value))) {
            value = parseFloat(target.value);
          }
          break;
      }
      this.value = value;
    }
  }
});
</script>
<template>
  <div :class="schema.parentClasses" :style="schema.parentStyles">
    <input
      :id="schema.fieldId"
      :type="schema.fieldType || 'text'"
      :name="schema.name || schema.fieldId"
      :class="schema.fieldClasses"
      :style="schema.fieldStyles"
      :value="value"
      @input="onInput"
    />
  </div>
</template>
