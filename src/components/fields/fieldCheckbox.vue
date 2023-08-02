<script lang="ts">
import abstractComponent from '@/mixins/abstractComponent';
import { generateId } from '@/utils/global';
import { defineComponent, ref } from 'vue';

interface checkboxValues {
  id: string | number;
  key: string | number;
  value: string | number;
  name: string | number;
}

export default defineComponent({
  mixins: [abstractComponent],
  data() {
    return {
      checkValues: ref<checkboxValues[]>([]),
      tempId: '',
      selectedValues: {},
      currentData: {
        id: '',
        name: '',
        _checked: false
      }
    };
  },
  methods: {
    onChange(e: Event) {
      let vm = this;
      const target = e.target as HTMLInputElement;
      let id = (target.attributes?.['itemId' as keyof typeof target.attributes] as any).value;
      let name = (target.attributes?.['caption' as keyof typeof target.attributes] as any).value;
      let check = target.checked;
      vm.currentData = {
        id: id,
        name: name,
        _checked: check
      };
      if (!vm.value) {
        vm.value = {};
      }
      vm.value[vm.currentData.id] = vm.currentData;
    }, //end onChange
    checkedItems() {
      const vm = this;
      if (vm.value && Object.keys(vm.value).length) {
        Object.entries(vm.value).forEach(([key, val]) => {
          (vm.selectedValues as any)[key] = (val as any)._checked;
        });
      }
    }, //end checkedItems
    asyncGetDynamicData() {
      this.checkValues = this.schema.values;
    } //end asyncGetData
  },
  mounted() {
    this.asyncGetDynamicData();
    this.checkedItems();
  },
  computed: {
    IDGenerator(): string {
      let id = generateId(5);
      this.tempId = id;
      return id;
    }
  },
  watch: {
    currentData: {
      handler(e) {
        this.checkedItems();
      },
      deep: true
    },
    value: {
      handler(e) {
        this.checkedItems();
      },
      deep: true
    },
    model: {
      handler() {
        this.checkedItems();
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
        v-for="(item, idx) in checkValues"
        :key="idx"
        :id="`${schema.model}_${idx}`"
        :class="schema.parentClasses"
        :style="schema.parentStyles"
      >
        <input
          :id="`${item.id || item.key}_${IDGenerator}`"
          :reservedId="`${item.id || item.key}`"
          :caption="item.name || item.value || ''"
          :itemId="item.id || item.key"
          :parentId="schema.model"
          :disabled="schema.disabled"
          :checked="(selectedValues as any)[item.id || item.key]"
          type="checkbox"
          :class="schema.fieldClasses"
          :style="schema.fieldStyles"
          @change="onChange"
        />
        <label
          :for="`${item.id || item.key}_${IDGenerator}`"
          :class="schema.optionsLabelClssses"
          :style="schema.optionsLabelStyles"
        >
          {{ item.name || item.value || '' }}
        </label>
      </div>
    </template>
    <template v-else-if="schema.isReadOnly === true">
      <div v-if="value && Object.keys(value).length > 0">
        <template v-for="(valItem, valIdx) of value">
          <span v-if="valItem._checked === true" :key="valIdx" class="readonly-item">
            {{ valItem.name || valItem.value || '' }}
          </span>
        </template>
      </div>
    </template>
  </div>
</template>
<style scoped>
.readonly-item {
  display: inline-block;
  padding: 4px 8px;
  margin: 2px 4px;
  background: #e0e0e0;
  border-radius: 4px;
  text-align: center;
}
</style>
