<script lang="ts">
import { TDynamic } from '@/interfaces';
import abstractComponent from '@/mixins/abstractComponent';
import { defineComponent } from 'vue';

interface IProps extends TDynamic {}
export default defineComponent<IProps>({
  name: 'Button',
  mixins: [abstractComponent],
  methods: {
    onClick(event: Event) {
      event.preventDefault();
      if (this.schema.onClick) {
        const field = { ...this.schema };
        const model = { ...this.model };
        const schema = {
          schema: { ...this.dubeSchema?.schema },
          model: { ...this.dubeSchema?.model }
        };
        this.schema.onClick(event, schema, field, model, this.value);
      }
    } //end onClick
  }
});
</script>
<template>
  <div :class="schema.parentClasses" :style="schema.parentStyles">
    <button
      :name="schema.buttonName"
      :type="schema.buttonType || 'button'"
      :disabled="schema.disabled"
      :class="schema.fieldClasses"
      :style="schema.fieldStyles"
      @click="onClick"
    >
      {{ value || schema.value }}
    </button>
  </div>
</template>
