<script lang="ts">
import { defineComponent, type PropType, shallowRef, onBeforeMount } from 'vue';
import { TDynamic, TField } from '@/interfaces';
import fieldComponents from '@/utils/loader';

export default defineComponent({
  name: 'FieldContainer',
  props: {
    dubeContext: {
      type: Object
    },
    fieldSchema: {
      type: Object as PropType<TField>,
      required: true
    },
    model: {
      type: Object,
      default: {}
    },
    options: {
      type: Object as PropType<TDynamic>,
      required: false
    }
  }, //end props

  setup(props) {
    let dynamicComponent = shallowRef<any>(null);

    const getFieldType = (field: TField): string => {
      return 'field' + field.type;
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
  } //end setup
}); //end defineComponent
</script>
<template>
  <div v-if="dynamicComponent" class="dube-field-container">
    <component
      ref="child"
      :id="fieldSchema.fieldId"
      :is="dynamicComponent"
      :dubeContext="dubeContext"
      :model="model"
      :schema="fieldSchema"
      :formOptions="options"
    ></component>
  </div>
</template>
