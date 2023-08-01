export type TDynamic = {
  [key: string]: any;
};
export type TField = {
  fieldId: string;
  fieldType: string;
  model: string;
  [key: string]: any;
};
export interface ISchema {
  fieldId: string;
  backRoute?: string;
  fields: TField[];
}
export interface IModel extends TDynamic {}
export interface IProps {
  model: IModel;
  schema: ISchema;
  disabled: boolean;
}
