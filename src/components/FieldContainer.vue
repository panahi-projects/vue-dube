<script lang="ts">
import { defineComponent, type PropType, shallowRef, onBeforeMount, ref, getCurrentInstance } from 'vue';
import { TField, IDube, IOprtions } from '@/interfaces';
import fieldComponents from '@/utils/loader';
import { get as objGet, isNil, isFunction } from 'lodash';

export default defineComponent({
  name: 'FieldContainer',
  props: {
    dubeSchema: {
      type: Object as PropType<IDube>
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
      type: Object as PropType<IOprtions>
    }
  }, //end props
  emits: ['model-updated', 'validated'],
  setup(props) {
    const context = getCurrentInstance();
    let dynamicComponent = shallowRef<any>(null);
    const getFieldType = (field: TField): string => {
      return 'field' + field.fieldType;
    }; //end getFieldType
    const getComponent = (compName: string) => {
      return fieldComponents[compName];
    }; //end getComponent

    const fieldFunctionHandler = (field: TField, objectKey: string) => {
      if (isFunction(field?.[objectKey])) return field?.[objectKey].call(context, props.model, field, context);

      if (isNil(field?.[objectKey])) return true;

      return field?.[objectKey];
    };
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
      dynamicComponent,
      fieldFunctionHandler
    };
  }, //end setup
  methods: {
    onModelUpdated(newValue: any, model: string) {
      this.$emit('model-updated', newValue, model);
    },
    getFieldID(schema: TField) {
      return schema.fieldId;
    },
    // Child field executed validation
    onFieldValidated(res: any, errors: any, field: TField) {
      this.$emit('validated', res, errors, field);
    }
  }
}); //end defineComponent
</script>
<template>
  <div
    v-if="dynamicComponent"
    class="dube-field-container"
    :class="fieldSchema.containerClasses"
    :style="fieldSchema.containerStyles"
  >
    <template v-if="fieldSchema.label">
      <label
        v-html="fieldFunctionHandler(fieldSchema, 'label')"
        :for="getFieldID(fieldSchema)"
        :class="fieldSchema.labelClasses"
        :style="fieldSchema.labelStyles"
      ></label>
      <span class="required" v-show="fieldSchema.required === true">*</span>
    </template>
    <component
      ref="child"
      :id="`field-${getFieldID(fieldSchema)}`"
      :class="fieldSchema.wrapperClasses"
      :style="fieldSchema.wrapperStyles"
      :is="dynamicComponent"
      :dubeSchema="dubeSchema"
      :model="model"
      :schema="fieldSchema"
      :options="options"
      @model-updated="onModelUpdated"
      @validated="onFieldValidated"
    ></component>
  </div>
</template>
<style scoped>
.required {
  color: #ff0066;
}
</style>
