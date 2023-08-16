<script lang="ts">
import abstractComponent from '@/mixins/abstractComponent';
import { defineComponent, onMounted, ref } from 'vue';
import Dube from '../Dube.vue';
import { IError, IModel, ISchema, TDynamic, TField } from '@/interfaces';
import { forEach } from 'lodash';

interface IProps extends TDynamic {}
interface IData {
  errors: Array<IError>;
}
export default defineComponent<IProps>({
  name: 'Form',
  mixins: [abstractComponent],
  components: { Dube },
  emits: ['model-updated', 'validated'],
  data(): IData {
    return {
      errors: [] // Validation errors
    };
  },
  methods: {
    onModelUpdated(newVal: any, modelName: any) {
      const vm = this;
      vm.value[modelName] = newVal;
      // this.$emit('model-updated', newVal, modelName);
    },
    onFieldValidated(res: any, errors: any, field: TField) {
      debugger;
      console.log('fieldForm:', res);

      this.$emit('validated', res, errors, field);
    }, //end onFieldValidated
    onSubmit(event: Event) {
      if (this.schema.onSubmit) {
        try {
          if (
            (event.target as HTMLElement)?.tagName === 'BUTTON' &&
            (event.target as HTMLButtonElement)?.type === 'submit'
          ) {
            const field = { ...this.schema };
            const model = { ...this.model };
            const schema = {
              schema: { ...this.dubeSchema?.schema },
              model: { ...this.dubeSchema?.model }
            };
            (this.schema.onSubmit as Function).call(this, event, schema, field, model, this.value);
          }
        } catch (err: any) {
          console.warn('Form submit has problem.', err);
        }
      }
    }
  },
  setup(props) {
    const formSchema = ref<ISchema>({
      ...props.schema,
      model: props.schema.model,
      fields: props.schema.fields || []
    });
    return {
      formSchema
    };
  }
});
</script>
<template>
  <div :class="schema.parentClasses" :style="schema.parentStyles">
    <form
      :ref="schema.name || schema.fieldId"
      :name="schema.formName"
      :method="schema.method"
      :action="schema.action"
      :target="schema.target"
      :class="schema.fieldClasses"
      :style="schema.fieldStyles"
      v-on:click="onSubmit"
    >
      <template v-if="schema.useSlot === true"></template>
      <template v-else-if="schema.fields">
        <Dube
          :schema="formSchema"
          :model="model[formSchema.model]"
          @model-updated="onModelUpdated"
          @validated="onFieldValidated"
        ></Dube>
        <div>{{ errors }}</div>
      </template>
      <template v-else>
        <div>Form fields not loaded</div>
      </template>
    </form>
  </div>
</template>
