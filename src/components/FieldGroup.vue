<script setup lang="ts">
import { PropType, computed } from 'vue';
import FieldContainer from './FieldContainer.vue';
import { forEach, isFunction, isNil } from 'lodash';
import { IModel, ISchema, TField } from '@/interfaces';

const dubeContext = this || {};

const props = defineProps({
  schema: {
    type: Object as PropType<ISchema>,
    require: true,
  },
  model: {
    type: Object as PropType<IModel>,
    require: true,
  },
  multiple: Boolean,
});

const fields = computed(() => {
  const vm = props;
  const res: Array<TField> = [];
  if (vm.schema && vm.schema.fields) {
    forEach(vm.schema.fields, (field: TField) => {
      if (!vm.multiple || field.multi === true) res.push(field);
    });
  }

  return res;
});

//METHODS:
const fieldVisible = (field: TField) => {
  if (isFunction(field.visible)) return field.visible.call(this, props.model, field, props.schema, this);
  if (isNil(field.visible)) return true;

  return field.visible;
};
</script>
<template>
  <div class="dube-field-group">
    <template v-for="(field, idx) in fields">
      <FieldContainer
        :key="`${idx}`"
        v-if="fieldVisible(field)"
        :dubeContext="dubeContext"
        :fieldSchema="field"
        :model="model"
      ></FieldContainer>
    </template>
  </div>
</template>
