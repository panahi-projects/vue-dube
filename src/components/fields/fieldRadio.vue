<script lang="ts">
import abstractComponent from '@/mixins/abstractComponent';
import { generateId } from '@/utils/global';
import { defineComponent, ref } from 'vue';

interface radioValuesType {
  id: string | number;
  key: string | number;
  value: string | number;
  name: string | number;
}

export default defineComponent({
  mixins: [abstractComponent],
  data() {
    return {
      radioValues: ref<radioValuesType[]>([]),
      tempId: '',
      selectedItem: '',
      currentData: {},
      webApiConnectionResult: []
    };
  }, //end data
  methods: {
    onChangeRadio(e: Event) {
      const vm = this;
      try {
        const target = e.target as HTMLInputElement;

        let id = target.value;
        let name = (target.attributes?.['caption' as keyof typeof target.attributes] as any).value;
        vm.currentData = {
          id: id,
          name: name
        };
        vm.model[vm.schema.model] = vm.currentData;
        let selectedItemValue = vm.model[vm.schema.model].id || '';
        vm.selectedItem = selectedItemValue;
      } catch (ex) {
        vm.selectedItem = '';
      }
    }, //end onChangeRadio
    async asyncGetDynamicData() {
      this.radioValues = this.schema.values;
    } //end asyncGetData
  },
  mounted() {
    const vm = this;
    vm.asyncGetDynamicData();
    if (vm.model) {
      try {
        vm.selectedItem = vm.model[vm.schema.model].id || '';
      } catch (ex) {}
    }
  },
  computed: {
    IDGenerator() {
      const id: string = generateId(5);
      this.tempId = id;
      return id;
    }
  },
  watch: {
    currentData: {
      handler(newVal, oldVal) {
        const vm = this;
        try {
          vm.value = newVal;
          vm.value = {};
          vm.value = vm.currentData;
        } catch (ex) {}
      },
      deep: true
    },
    value: {
      handler() {
        this.currentData = this.value || {};
      },
      deep: true
    },
    model: {
      handler() {
        try {
          this.selectedItem = this.model[this.schema.model].id || '';
        } catch (ex) {}
      },
      deep: true
    }
  }
});
</script>
<template>
  <div>
    <template v-if="schema.isReadOnly !== true">
      <div
        v-for="(item, idx) in radioValues"
        :key="idx"
        :id="`${schema.model}_${idx}`"
        :class="schema.parentClasses"
        :style="schema.parentStyles"
      >
        <input
          type="radio"
          :id="`${schema.model}_${item.id || item.key}_${IDGenerator}`"
          :name="schema.inputName || schema.id + '_' + tempId"
          :reservedId="`${schema.model}_${item.id || item.key}`"
          :itemId="item.id || item.key"
          :parentId="schema.model"
          :caption="item.name || item.value || ''"
          :value="item.id || item"
          :disabled="schema.disabled"
          :checked="selectedItem == item.id"
          :class="schema.fieldClasses"
          :style="schema.fieldStyles"
          @change="onChangeRadio"
        />
        <label
          :for="`${schema.model}_${item.id || item.key}_${tempId}`"
          :class="schema.optionsLabelClssses"
          :style="schema.optionsLabelStyles"
        >
          {{ item.name || item.value || item }}</label
        >
      </div>
    </template>
    <template v-else-if="schema.isReadOnly === true">
      <div v-if="value && Object.keys(value).length > 0">
        <span>{{ value.name || value.value || value }}</span>
      </div>
    </template>
  </div>
</template>
