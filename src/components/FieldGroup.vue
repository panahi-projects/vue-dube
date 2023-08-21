<script lang="ts">
import { PropType, defineComponent } from 'vue';
import FieldContainer from './FieldContainer.vue';
import { forEach, isFunction, isNil } from 'lodash';
import { IDube, IModel, IOprtions, ISchema, TField, IError } from '@/interfaces';

interface IData {
  errors: Array<IError>;
}

export default defineComponent({
  props: {
    dubeSchema: {
      type: Object as PropType<IDube>
    },
    schema: {
      type: Object as PropType<ISchema>,
      require: true
    },
    model: {
      type: Object as PropType<IModel>,
      require: true
    },
    options: {
      type: Object as PropType<IOprtions>
    },
    multiple: Boolean
  },
  emits: ['model-updated', 'validated'],
  components: { FieldContainer },
  data(): IData {
    return {
      errors: [] // Validation errors
    };
  },
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
  watch: {
    errors: {
      handler(newVal: IError[]) {
        const vm = this;
        const validStatus = newVal.findIndex((err: IError) => err.isValid === false);
        // console.log('validStatus>>>', validStatus);

        const isValid = validStatus < 0 ? true : false;
        vm.$emit('validated', isValid, newVal, vm);
      },
      deep: true
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
    },
    // Child field executed validation
    onFieldValidated(res: any, errors: any, field: TField) {
      const vm = this;
      // Remove old errors for this field
      vm.errors = vm.errors.filter((e: any) => e.fieldId !== field.schema.fieldId);
      if (!res && errors && errors.length > 0) {
        // Add errors
        forEach(errors, (err) => {
          vm.errors.push({
            ...err
          });
        });
      }
    } //end onFieldValidated
  }
});
</script>
<template>
  <div class="dube-field-group" :class="(schema as ISchema).groupFieldClasses">
    <template v-for="(field, idx) in fields">
      <FieldContainer
        :key="`${idx}`"
        v-if="fieldVisible(field)"
        :dubeSchema="dubeSchema"
        :fieldSchema="field"
        :model="model"
        :options="options"
        @model-updated="onModelUpdated"
        @validated="onFieldValidated"
      ></FieldContainer>
    </template>
  </div>
</template>
