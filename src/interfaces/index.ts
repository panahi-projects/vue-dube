export type TDynamic = {
  [key: string]: any;
};
export type TField = {
  fieldId: string;
  type: string;
  model?: string;
  [key: string]: any;
};
export type TLookupFieldsList = {
  fieldId: string;
  lookupAlterName?: string;
  lookupProperty: string;
  lookupPath?: string;
  fieldPath?: string;
  setModel?: boolean;
};
export interface ISchema {
  id: string;
  backRoute?: string;
  fields: TField[];
  lookupFieldsList?: TLookupFieldsList[];
}
export interface IModel extends TDynamic {}
export interface IFormOptions extends TDynamic {}
export interface IProps {
  dfb: any;
  model: IModel;
  schema: ISchema;
  formOptions: IFormOptions;
  disabled: boolean;
}
