<script lang="ts">
import { PropType, defineComponent } from 'vue';
// import { FieldGroup } from './';
import { IModel, ISchema } from '@/interfaces';
import FieldGroup from './FieldGroup.vue';
// const props = defineProps({
//   schema: {
//     type: Object as PropType<ISchema>,
//     require: true
//   },
//   model: {
//     type: Object as PropType<IModel>,
//     require: true
//   }
// });

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
  }
});
</script>
<template>
  <div class="dube" :data-cy-id="schema?.fieldId" data-cy-class="dube">
    <FieldGroup :schema="schema" :model="model" @model-updated="onModelUpdated"></FieldGroup>
  </div>
</template>
