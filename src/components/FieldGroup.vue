<script lang="ts">
import { PropType, computed, defineComponent } from 'vue';
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

// const props = defineProps({
//   schema: {
//     type: Object as PropType<ISchema>,
//     require: true
//   },
//   model: {
//     type: Object as PropType<IModel>,
//     require: true
//   },
//   multiple: Boolean
// });

// const fields = computed(() => {
//   const vm = props;
//   const res: Array<TField> = [];
//   if (vm.schema && vm.schema.fields) {
//     forEach(vm.schema.fields, (field: TField) => {
//       if (!vm.multiple || field.multi === true) res.push(field);
//     });
//   }

//   return res;
// });

// //METHODS:
// const fieldVisible = (field: TField) => {
//   if (isFunction(field.visible)) return field.visible.call(this, props.model, field, props.schema, this);
//   if (isNil(field.visible)) return true;

//   return field.visible;
// };
// const onModelUpdated = (newValue: any, model: string) => {
//   console.log(newValue, model);
// };
</script>
<template>
  <div class="dube-field-group">
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
