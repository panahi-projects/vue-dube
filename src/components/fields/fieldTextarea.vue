<template>
  <div :class="schema.parentClasses" :style="schema.parentStyles">
    <template v-if="schema.isReadOnly !== true">
      <textarea
        v-model="value"
        :id="schema.fieldId"
        :class="schema.fieldClasses"
        :style="schema.fieldStyles"
        :disabled="schema.disabled"
        :maxlength="schema.max"
        :minlength="schema.min"
        :placeholder="schema.placeholder"
        :readonly="schema.readonly"
        :required="schema.required"
        :rows="schema.rows || 2"
        :name="schema.inputName"
        v-attributes="'input'"
      ></textarea>
    </template>
    <template v-else-if="schema.isReadOnly === true">
      <div v-if="value">
        <span v-html="value"></span>
      </div>
    </template>
  </div>
</template>
<script lang="ts">
import abstractComponent from '@/mixins/abstractComponent';
import { defineComponent } from 'vue';

export default defineComponent({
  mixins: [abstractComponent]
});
</script>
