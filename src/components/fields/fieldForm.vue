<script lang="ts">
import abstractComponent from '@/mixins/abstractComponent';
import { defineComponent, ref } from 'vue';
import Dube from '../Dube.vue';
import { IModel, ISchema } from '@/interfaces';
export default defineComponent({
  name: 'Form',
  mixins: [abstractComponent],
  components: { Dube },
  methods: {
    onModelUpdated(newVal: any, modelName: any) {
      const vm = this;
      vm.value[modelName] = newVal;
    }
  },
  setup(props) {
    let formSchema = ref<ISchema>({
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
  <form :name="schema.formName" :method="schema.method" :action="schema.action" :target="schema.target">
    <template v-if="schema.useSlot === true"></template>
    <template v-else-if="schema.fields">
      <Dube :schema="formSchema" :model="model[formSchema.model]" @model-updated="onModelUpdated"></Dube>
    </template>
    <template v-else>
      <div>Form fields not loaded</div>
    </template>
  </form>
</template>
