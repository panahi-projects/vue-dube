import { IError } from '..';
/**
 * Using Singleton design pattern to store the validation status
 */
interface Validation {
  isValid: boolean;
  validationStatus: IError[];
}

let instance: any;
let formsValidation: IError[] = [];

class validationStore {
  constructor() {
    if (instance) {
      throw new Error('New instance cannot be created!');
    }

    instance = this;
  }
  setErrors(newVal: IError) {
    debugger;
    formsValidation.push(newVal);
  }
  getErrors() {
    debugger;
    const isValidForm: boolean = formsValidation.findIndex((x) => x.isValid == false) >= 0 ? false : true;
    const response: Validation = {
      isValid: isValidForm,
      validationStatus: formsValidation
    };
    return response;
  }

  resetErrors() {
    formsValidation.splice(0);
  }
}
let validationStoreInstance = Object.freeze(new validationStore());

export default validationStoreInstance;
