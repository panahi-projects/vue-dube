<script setup lang="ts">
import { ref } from 'vue';
import { DynamicBuilder } from '.';

const schema = ref<any>({
  fieldId: 'schema1',
  fields: [
    {
      fieldId: 'firstName',
      fieldType: 'Textbox',
      label: 'First Name',
      model: 'firstName',
      inputType: 'text'
    },
    {
      fieldId: 'lastName',
      fieldType: 'Textbox',
      label: (model: string, field: any) => field.reservedLabelName,
      model: 'lastName',
      inputType: 'text',
      reservedLabelName: 'Last Name'
    }
  ]
});
const model = ref<any>({
  firstName: '',
  lastName: ''
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
