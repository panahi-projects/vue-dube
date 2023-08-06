<script setup lang="ts">
import { ref } from 'vue';
import { DynamicBuilder } from '.';

//the classes that are use in the below shcema is based on Bootstrap 5
const schema = ref<any>({
  fieldId: 'schema1',
  groupFieldClasses: '',
  fields: [
    {
      fieldId: 'sampleText',
      fieldType: 'Textbox',
      label: 'Sample text (out of form):',
      model: 'sampleText',
      inputType: 'text',
      containerClasses: 'row mb-3',
      wrapperClasses: 'col-sm-10',
      labelClasses: 'col-form-label col-sm-2',
      fieldClasses: 'form-control'
    },
    {
      fieldId: 'myForm',
      fieldType: 'Form',
      model: 'myForm',
      fields: [
        {
          fieldId: 'firstName',
          fieldType: 'Textbox',
          label: 'First Name:',
          model: 'firstName',
          inputType: 'text',
          containerClasses: 'row mb-3',
          wrapperClasses: 'col-sm-10',
          labelClasses: 'col-form-label col-sm-2',
          fieldClasses: 'form-control'
        },
        {
          fieldId: 'lastName',
          fieldType: 'Textbox',
          label: (model: string, field: any) => field.reservedLabelName,
          model: 'lastName',
          inputType: 'text',
          reservedLabelName: 'Last Name:',
          containerClasses: 'row mb-3',
          wrapperClasses: 'col-sm-10',
          labelClasses: 'col-form-label col-sm-2',
          fieldClasses: 'form-control'
        },
        {
          fieldId: 'gender',
          model: 'gender',
          fieldType: 'Radio',
          label: 'Gender:',
          containerClasses: 'row mb-3',
          labelClasses: 'col-md-2',
          wrapperClasses: 'col-md-10',
          optionsLabelClssses: 'form-check-label',
          parentClasses: 'form-check form-check-inline',
          fieldClasses: 'form-check-input',
          values: [
            {
              id: 'male',
              name: 'Male'
            },
            {
              id: 'female',
              name: 'Female'
            }
          ]
        },
        {
          fieldId: 'seniorityLevel',
          fieldType: 'Select',
          label: 'Seniority Level:',
          model: 'seniorityLevel',
          containerClasses: 'row mb-3',
          wrapperClasses: 'col-sm-10',
          labelClasses: 'col-form-label col-sm-2',
          fieldClasses: 'form-select',
          values: [
            {
              id: 'junior',
              name: 'Junior',
              rank: 4
            },
            {
              id: 'medior',
              name: 'Medior',
              rank: 3
            },
            {
              id: 'senior',
              name: 'Senior',
              rank: 2
            },
            {
              id: 'lead',
              name: 'Lead',
              rank: 1
            }
          ]
        },
        {
          fieldId: 'city',
          fieldType: 'Select',
          label: 'City:',
          model: 'city',
          valueType: 'string',
          containerClasses: 'row mb-3',
          wrapperClasses: 'col-sm-10',
          labelClasses: 'col-form-label col-sm-2',
          fieldClasses: 'form-select',
          values: [
            {
              id: 'shiraz',
              name: 'Shiraz'
            },
            {
              id: 'tehran',
              name: 'Tehran'
            },
            {
              id: 'yazd',
              name: 'Yazd'
            },
            {
              id: 'ahvaz',
              name: 'Ahvaz'
            },
            {
              id: 'sari',
              name: 'Sari'
            }
          ]
        },
        {
          fieldId: 'languages',
          fieldType: 'Checkbox',
          label: 'Languages:',
          model: 'languages',
          containerClasses: 'row mb-3',
          labelClasses: 'col-md-2',
          wrapperClasses: 'col-md-10',
          optionsLabelClssses: 'form-check-label',
          parentClasses: 'form-check form-check-inline',
          fieldClasses: 'form-check-input',
          isReadOnly: false,
          values: [
            {
              id: 'english',
              name: 'English'
            },
            {
              id: 'russian',
              name: 'Russian'
            },
            {
              id: 'germany',
              name: 'Germany'
            },
            {
              id: 'turkish',
              name: 'Turkish'
            }
          ]
        },
        {
          fieldId: 'bio',
          label: 'Bio:',
          model: 'bio',
          fieldType: 'Textarea',
          containerClasses: 'row mb-3',
          wrapperClasses: 'col-sm-10',
          labelClasses: 'col-form-label col-sm-2',
          fieldClasses: 'form-control',
          rows: 3,
          placeholder: 'Type your bio here...',
          max: 256
        },
        {
          fieldId: 'btn1',
          model: 'btn1',
          fieldType: 'Button',
          onClick: (e: Event, _schema: any, _field: any, _model: any, _value: any) => {
            console.log('Form submit:');
            if (_schema?.schema?.fields?.length) {
              let found = (_schema.schema.fields as Array<any>).find((x) => {
                if (x.fieldId === 'firstName') {
                  return x;
                }
              });
              console.log('found item:', found.fieldId);
            }
            console.log('_field:', _field);
            console.log('model:', _model?.gender?.id);
            console.log('value:', _value);
          },
          value: 'Submit'
        }
      ]
    }
  ]
});
const model = ref<any>({
  myForm: {}
});
const onModelUpdated = (newVal: any, modelName: any) => {
  model.value[modelName] = newVal;
};
</script>

<template>
  <div>
    <h1>App Test:</h1>
    <main>
      <!-- components for test goes here -->
      <DynamicBuilder :schema="schema" :model="model" @model-updated="onModelUpdated"></DynamicBuilder>
      <div>{{ model }}</div>
    </main>
  </div>
</template>

<style scoped></style>
