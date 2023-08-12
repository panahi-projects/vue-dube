export type TDynamic = {
  [key: string]: any;
};
export type TField = {
  fieldId: string;
  fieldType: string;
  model: string;
  fields?: TField[];
  [key: string]: any;
};
export interface ISchema {
  fieldId: string;
  backRoute?: string;
  groupFieldClasses?: string;
  fields: TField[];
  model: string;
}
export interface IDube {
  schema: ISchema;
  model: IModel;
}
export interface IError {
  fieldId: string;
  isValid: boolean;
}
export interface IModel extends TDynamic {}
export interface IOprtions extends TDynamic {}
export interface IProps {
  model: IModel;
  schema: ISchema;
  disabled: boolean;
}
