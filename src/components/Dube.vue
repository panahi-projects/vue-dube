<script lang="ts">
import { PropType, defineComponent, ref } from 'vue';
import { IDube, IModel, ISchema, TField, IOprtions } from '@/interfaces';
import FieldGroup from './FieldGroup.vue';
import { validationStore } from '@/stores';

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
    options: {
      type: Object as PropType<IOprtions>
    }
  },
  emits: ['model-updated', 'validated'],
  components: { FieldGroup },
  methods: {
    onModelUpdated(newValue: any, model: string) {
      this.$emit('model-updated', newValue, model);
    },
    onFieldValidated(res: any, errors: any, field: TField) {
      let _errors = validationStore.getErrors();
      console.log({ _errors });
      this.$emit('validated', res, errors, field);
    }
  },
  setup(props) {
    const dubeSchema = ref<IDube>({
      schema: {
        ...(props.schema as ISchema)
      },
      model: {
        ...(props.model as IModel)
      }
    });
    return {
      dubeSchema
    };
  }
});
</script>
<template>
  <div class="dube" :data-cy-id="schema?.fieldId" data-cy-class="dube">
    <FieldGroup
      :dubeSchema="dubeSchema"
      :schema="schema"
      :model="model"
      :options="options"
      @model-updated="onModelUpdated"
      @validated="onFieldValidated"
    ></FieldGroup>
  </div>
</template>
