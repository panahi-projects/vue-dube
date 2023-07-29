<script setup lang="ts">
import { PropType } from 'vue';
import { FieldGroup } from './';
import { IModel, ISchema } from '@/interfaces';
const props = defineProps({
  schema: {
    type: Object as PropType<ISchema>,
    require: true
  },
  model: {
    type: Object as PropType<IModel>,
    require: true
  }
});
</script>
<template>
  <div class="dube" :data-cy-id="schema?.id" data-cy-class="dube">
    <FieldGroup :schema="schema" :model="model"></FieldGroup>
  </div>
</template>
