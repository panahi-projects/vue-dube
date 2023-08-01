<script setup lang="ts">
import { ref } from 'vue';
import { DynamicBuilder } from '.';

const schema = ref<any>({
  fieldId: 'schema1',
  fields: [
    {
      fieldId: '1',
      fieldType: 'Textbox',
      label: 'Text 1',
      model: 'txt1',
      inputType: 'text'
    },
    {
      fieldId: '2',
      fieldType: 'Textbox',
      label: 'Text 2',
      model: 'txt2',
      inputType: 'text'
    }
  ]
});
const model = ref<any>({
  txt1: 'test 1',
  txt2: 'test 2'
});
const onModelUpdated = (newVal: any, modelName: any) => {
  model.value[modelName] = newVal;
};
</script>

<template>
  <div>
    <h1>App Test:</h1>
    <main>
      <!-- components for test goes here -->
      <DynamicBuilder :schema="schema" :model="model" @model-updated="onModelUpdated"></DynamicBuilder>
      <div>{{ model }}</div>
    </main>
  </div>
</template>

<style scoped></style>
