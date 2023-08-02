<script lang="ts">
import { isObject, isNil, find } from 'lodash';
import abstractField from '@/mixins/abstractComponent';
import { defineComponent } from 'vue';
import { TDynamic } from '@/interfaces';

export default defineComponent({
  name: 'Select',
  mixins: [abstractField],
  data() {
    return {
      selectedItem: '',
      formValidationErrorsList: []
    };
  },
  computed: {
    selectOptions(): TDynamic {
      return this.schema.selectOptions || {};
    },
    items() {
      let values = this.schema.values;
      if (typeof values == 'function') {
        return this.groupValues(values.apply(this, [this.model, this.schema]));
      } else return this.groupValues(values);
    }
  },
  methods: {
    formatValueToField(value: string | TDynamic) {
      if (isNil(value)) {
        return null;
      }
      return value;
    }, //end formatValueToField
    groupValues(values: Array<TDynamic>) {
      let array: any = [];
      let arrayElement: any = {};

      values.forEach((item) => {
        arrayElement = null;

        if (item.group && isObject(item)) {
          // There is in a group.

          // Find element with this group.
          arrayElement = find(array, (i) => i.group === item.group);

          if (arrayElement) {
            // There is such a group.

            arrayElement.ops.push({
              id: item.id,
              name: item.name
            });
          } else {
            // There is not such a group.

            // Initialising.
            arrayElement = {
              group: '',
              ops: []
            };

            // Set group.
            arrayElement.group = item.group;

            // Set Group element.
            arrayElement.ops.push({
              id: item.id,
              name: item.name
            });

            // Add array.
            array.push(arrayElement);
          }
        } else {
          // There is not in a group.
          array.push(item);
        }
      });

      // With Groups.
      return array;
    }, //end groupValues
    getGroupName(item: TDynamic) {
      if (item && item.group) {
        return item.group;
      }
    }, //end getGroupName
    getItemValue(item: TDynamic) {
      if (isObject(item)) {
        if (
          typeof this.schema['selectOptions'] !== 'undefined' &&
          typeof this.schema['selectOptions']['value'] !== 'undefined'
        ) {
          return item[this.schema.selectOptions.value];
        } else {
          // Use 'id' instead of 'value' cause of backward compatibility
          if (typeof item['id'] !== 'undefined') {
            return item.id;
          } else {
            throw '`id` is not defined. If you want to use another key name, add a `value` property under `selectOptions` in the schema.';
          }
        }
      } else {
        return item;
      }
    }, //end getItemValue
    getItemName(item: TDynamic) {
      const vm = this;
      if (isObject(item)) {
        if (
          typeof vm.schema['selectOptions'] !== 'undefined' &&
          typeof vm.schema['selectOptions']['name'] !== 'undefined'
        ) {
          return item[vm.schema.selectOptions.name];
        } else {
          if (typeof item['name'] !== 'undefined') {
            return item.name;
          } else {
            throw '`name` is not defined. If you want to use another key name, add a `name` property under `selectOptions` in the schema.';
          }
        }
      } else {
        return item;
      }
    }, //end getItemName
    onChangeDropdown(e: Event) {
      const vm = this;
      const target = e.target as HTMLSelectElement;
      if (target.value) {
        let params = {
          id: target.value,
          name: target.options[target.selectedIndex].text
        };
        let strParam = target.value;
        if (vm.schema?.valueType == 'string') {
          vm.model[vm.schema.model] = strParam;
        } else {
          vm.model[vm.schema.model] = params;
        }
      } else {
        vm.model[vm.schema.model] = {};
      }
      try {
        let selectedItemValue = vm.model?.[vm.schema?.model]?.id;
        vm.selectedItem = selectedItemValue;
      } catch (ex) {
        vm.selectedItem = '';
      }
      if (vm.schema?.isSetting == true && vm.schema?.model == 'type') {
        vm.value = vm.selectedItem;
      }
    } //end onChangeDropdown
  },
  mounted() {
    try {
      let selectedItemValue;
      if (this.schema?.valueType == 'string') {
        selectedItemValue = this.model[this.schema.model];
      } else {
        selectedItemValue = this.model[this.schema.model].id || '';
      }
      this.selectedItem = selectedItemValue;
    } catch (ex) {}
  },
  watch: {
    model: {
      handler() {
        try {
          if (this.model?.[this.schema?.model]?.id) {
            this.selectedItem = this.model[this.schema.model].id || '';
          }
        } catch (ex) {}
      },
      deep: true
    }
  }
});
</script>
<template>
  <div :class="schema.parentClasses" :style="schema.parentStyles">
    <template v-if="schema.isReadOnly !== true">
      <select
        :id="schema.fieldId"
        @change="onChangeDropdown"
        :name="schema.name"
        :class="schema.fieldClasses"
        :style="schema.fieldStyles"
        :disabled="schema.disabled"
      >
        <option value>{{ selectOptions.noneSelectedText || '&lt;Nothing selected&gt;' }}</option>
        <template v-for="(item, idx) in items" :key="idx">
          <option :value="getItemValue(item)" :selected="selectedItem == item.id">
            {{ item.name }}
          </option>
        </template>
      </select>
    </template>
    <template v-else-if="schema.isReadOnly === true">
      <div v-if="value">
        <span>{{ value.name }}</span>
      </div>
    </template>
  </div>
</template>
