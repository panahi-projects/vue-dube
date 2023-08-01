<script lang="ts">
import { defineComponent, type PropType, shallowRef, onBeforeMount } from 'vue';
import { TDynamic, TField } from '@/interfaces';
import fieldComponents from '@/utils/loader';

export default defineComponent({
  name: 'FieldContainer',
  props: {
    fieldSchema: {
      type: Object as PropType<TField>,
      required: true
    },
    model: {
      type: Object,
      default: {}
    }
  }, //end props
  emits: ['model-updated'],
  setup(props) {
    let dynamicComponent = shallowRef<any>(null);

    const getFieldType = (field: TField): string => {
      return 'field' + field.fieldType;
    }; //end getFieldType
    const getComponent = (compName: string) => {
      return fieldComponents[compName];
    }; //end getComponent
    onBeforeMount(() => {
      // Set up the interval to check for updates
      const intervalId = setInterval(() => {
        // Check if the variable (dynamicComponent) has been updated with a new value
        if (dynamicComponent.value == null || dynamicComponent.value == undefined) {
          dynamicComponent.value = getComponent(getFieldType(props.fieldSchema));
        } else {
          clearInterval(intervalId);
        }
      }, 1);
      // Clean up the interval when the component is unmounted
      return () => {
        clearInterval(intervalId);
      };
    }); //end onBeforeMount
    return {
      dynamicComponent
    };
  }, //end setup
  methods: {
    onModelUpdated(newValue: any, model: string) {
      this.$emit('model-updated', newValue, model);
    }
  }
}); //end defineComponent
</script>
<template>
  <div v-if="dynamicComponent" class="dube-field-container">
    <component
      ref="child"
      :id="fieldSchema.fieldId"
      :is="dynamicComponent"
      :model="model"
      :schema="fieldSchema"
      @model-updated="onModelUpdated"
    ></component>
  </div>
</template>
