import { IDube, TField } from '@/interfaces';
import { get as objGet, uniq as arrayUniq, isArray, isString, isNil } from 'lodash';
import { PropType, defineComponent } from 'vue';

export default defineComponent({
  props: {
    dubeSchema: {
      type: Object as PropType<IDube>
    },
    schema: {
      type: Object as PropType<TField>,
      required: true
    },
    model: {
      type: Object,
      default: {}
    }
  },
  emits: ['model-updated'],
  computed: {
    value: {
      cache: false,
      get(): any {
        const self = this;
        const val = objGet(self.model, self.schema.model);

        return self.formatValueToField(val);
      },
      set(newValue: any) {
        const self = this;
        const oldValue = self.value;
        newValue = self.formatValueToModel(newValue);

        self.updateModelValue(newValue, oldValue);
      }
    }
  },
  methods: {
    updateModelValue(newValue: any, oldValue: any) {
      this.$emit('model-updated', newValue, this.schema.model);
    },
    formatValueToField(value: any) {
      return value;
    },
    formatValueToModel(value: any) {
      return value;
    }
  }
});
