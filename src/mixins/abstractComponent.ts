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
      // if (vm.schema.onChanged && isFunction(vm.schema.onChanged)) {
      //   vm.schema.onChanged.call(vm, vm.model, newValue, oldValue, vm.schema);
      // }

      // if (objGet(vm.options, 'validateAfterChanged', false) === true) {
      //   if (objGet(vm.schema, 'validateDebounceTime', objGet(vm.options, 'validateDebounceTime', 0)) > 0) {
      //     vm.debouncedValidate();
      //   } else {
      // vm.validate();
      //   }
      // }
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
      let results: any[] = [];
      vm.clearValidationErrors();
      const validator = vm.schema.validator;
      if (validator) {
        // vm.errors.push({ isValid: false, fieldId: vm.schema.fieldId });
        const result = validator(vm.value, vm.schema, vm.model);
        const isFieldValid: IError = {
          isValid: result,
          fieldId: vm.schema.fieldId
        };
        vm.errors.push(isFieldValid);
        // console.log('vm.errors', vm.errors);
      }
      const isValid = vm.errors.length === 0;
      vm.$emit('validated', isValid, vm.errors, vm);

      // const validateAsync = objGet(vm.options, 'validateAsync', false);

      // if (vm.schema.disableValidator === true) {
      //   return results;
      // }

      // if (vm.schema.validator && vm.schema.readonly !== true && vm.schema.disabled !== true) {
      //   const validators: any[] = [];
      //   if (!isArray(vm.schema.validator)) {
      //     validators.push(vm.convertValidator(vm.schema.validator).bind(vm));
      //   } else {
      //     forEach(vm.schema.validator, (validator: any) => {
      //       validators.push(vm.convertValidator(validator).bind(vm));
      //     });
      //   }

      //   forEach(validators, (validator: any) => {
      //     if (validateAsync) {
      //       results.push(validator(vm.value, vm.schema, vm.model));
      //     } else {
      //       const result = validator(vm.value, vm.schema, vm.model);
      //       if (result && isFunction(result.then)) {
      //         result.then((err: any) => {
      //           if (err) {
      //             vm.errors = vm.errors.concat(err);
      //           }
      //           const isValid = vm.errors.length === 0;
      //           vm.$emit('validated', isValid, vm.errors, vm);
      //         });
      //       } else if (result) {
      //         results = results.concat(result);
      //       }
      //     }
      //   });
      // }

      // const handleErrors = (errors: any) => {
      //   let fieldErrors: any[] = [];
      //   forEach(arrayUniq(errors), (err: any) => {
      //     if (isArray(err) && err.length > 0) {
      //       fieldErrors = fieldErrors.concat(err);
      //     } else if (isString(err)) {
      //       fieldErrors.push(err);
      //     }
      //   });
      //   if (isFunction(vm.schema.onValidated)) {
      //     vm.schema.onValidated.call(this, vm.model, fieldErrors, vm.schema);
      //   }

      //   const isValid = fieldErrors.length === 0;
      //   this.$emit('validated', isValid, fieldErrors, this);

      //   vm.errors = fieldErrors;
      //   return fieldErrors;
      // };
      // if (!validateAsync) {
      //   return handleErrors(results);
      // }

      // return Promise.all(results).then(handleErrors);
    }, //end validate
    clearValidationErrors() {
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
