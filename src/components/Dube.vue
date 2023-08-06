<script lang="ts">
import { PropType, defineComponent, ref } from 'vue';
// import { FieldGroup } from './';
import { IDube, IModel, ISchema } from '@/interfaces';
import FieldGroup from './FieldGroup.vue';
export default defineComponent({
  props: {
    schema: {
      type: Object as PropType<ISchema>,
      require: true
    },
    model: {
      type: Object as PropType<IModel>,
      require: true
    }
  },
  emits: ['model-updated'],
  components: { FieldGroup },
  methods: {
    onModelUpdated(newValue: any, model: string) {
      this.$emit('model-updated', newValue, model);
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
    <FieldGroup :dubeSchema="dubeSchema" :schema="schema" :model="model" @model-updated="onModelUpdated"></FieldGroup>
  </div>
</template>
