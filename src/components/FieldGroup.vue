<script lang="ts">
import { PropType, defineComponent } from 'vue';
import FieldContainer from './FieldContainer.vue';
import { forEach, isFunction, isNil } from 'lodash';
import { IModel, ISchema, TField } from '@/interfaces';

export default defineComponent({
  props: {
    schema: {
      type: Object as PropType<ISchema>,
      require: true
    },
    model: {
      type: Object as PropType<IModel>,
      require: true
    },
    multiple: Boolean
  },
  emits: ['model-updated'],
  components: { FieldContainer },
  computed: {
    fields() {
      const vm = this;
      const res: Array<TField> = [];
      if (vm.schema && vm.schema.fields) {
        forEach(vm.schema.fields, (field: TField) => {
          if (!vm.multiple || field.multi === true) res.push(field);
        });
      }

      return res;
    }
  },
  // setup(props){
  //   return {
  //     props
  //   }
  // },
  methods: {
    fieldVisible(field: TField) {
      const vm = this;
      if (isFunction(field.visible)) return field.visible.call(vm, vm.model, field, vm.schema, vm);
      if (isNil(field.visible)) return true;

      return field.visible;
    },
    onModelUpdated(newValue: any, model: string) {
      this.$emit('model-updated', newValue, model);
    }
  }
});
</script>
<template>
  <div class="dube-field-group" :class="(schema as ISchema).groupFieldClasses">
    <template v-for="(field, idx) in fields">
      <FieldContainer
        :key="`${idx}`"
        v-if="fieldVisible(field)"
        :fieldSchema="field"
        :model="model"
        @model-updated="onModelUpdated"
      ></FieldContainer>
    </template>
  </div>
</template>
