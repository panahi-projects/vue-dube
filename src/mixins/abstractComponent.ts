import { IDube, IError, TField } from '@/interfaces';
import {
  get as objGet,
  uniq as arrayUniq,
  isArray,
  isString,
  isNil,
  forEach,
  isFunction,
  defaults,
  debounce
} from 'lodash';
import { PropType, defineComponent } from 'vue';
import validators from '../utils/validators';
// import { Database } from '@/stores';
import { validationStore } from '@/stores';
interface Data {
  errors: Array<IError>;
  debouncedValidateFunc: any;
}

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
    },
    options: {
      type: Object,
      default: {}
    }
  },
  emits: ['model-updated', 'validated'],
  data(): Data {
    return {
      errors: [],
      debouncedValidateFunc: null
    };
  },
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
      const vm = this;
      vm.$emit('model-updated', newValue, vm.schema.model);
      vm.validate();
    }, //end updateModelValue
    formatValueToField(value: any) {
      return value;
    }, //end formatValueToField
    formatValueToModel(value: any) {
      return value;
    }, //end formatValueToModel
    convertValidator(validator: any) {
      if (isString(validator)) {
        if (validators[validator as keyof typeof validators] !== null)
          return validators[validator as keyof typeof validators];
        else {
          console.warn(`'${validator}' is not a validator function!`);
          return null; // caller need to handle null
        }
      }
      return validator;
    }, //end convertValidator
    validate() {
      const vm = this;
      vm.clearValidationErrors();
      const validator = vm.schema.validator;
      if (validator) {
        const result = validator(vm.value, vm.schema, vm.model);
        // console.log('value:', vm.value);

        const isFieldValid: IError = {
          isValid: result,
          fieldId: vm.schema.fieldId
        };
        vm.errors.push(isFieldValid);
        // console.log('vm.errors', vm.errors);
        validationStore.setErrors(isFieldValid);
      }
      const isValid: boolean = vm.errors.find((err) => err.isValid === false) ? false : true;
      vm.$emit('validated', isValid, vm.errors, vm);
    }, //end validate
    clearValidationErrors() {
      validationStore.resetErrors();
      this.errors?.splice(0);
    }, //end clearValidationErrors
    debouncedValidate() {
      const vm = this;
      if (!isFunction(vm.debouncedValidateFunc)) {
        vm.debouncedValidateFunc = debounce(
          vm.validate.bind(vm),
          objGet(vm.schema, 'validateDebounceTime', objGet(vm.options, 'validateDebounceTime', 600))
        );
      }
      vm.debouncedValidateFunc();
    } //end debouncedValidate
  }
});
