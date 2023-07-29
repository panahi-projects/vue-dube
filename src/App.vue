<script setup lang="ts">
import { DynamicBuilder } from '.';
const schema = {
  id: 'schema1',
  fields: [
    {
      fieldId: '1',
      type: 'Textbox',
      label: 'Text 1',
      model: 'txt1'
    },
    {
      fieldId: '2',
      type: 'Textbox',
      label: 'Text 2',
      model: 'txt2'
    }
  ]
};
const model = {
  txt1: '',
  txt2: ''
};
</script>

<template>
  <div>
    <h1>App Test:</h1>
    <main>
      <!-- components for test goes here -->
      <DynamicBuilder :schema="schema" :model="model"></DynamicBuilder>
    </main>
  </div>
</template>

<style scoped></style>
