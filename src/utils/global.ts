import { TField } from '@/interfaces';
import { isFunction, isNil } from 'lodash';

export const generateId = (length: number): string => {
  let result = '';
  const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength: number = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
export const create_UUID = (): string => {
  let dt: number = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
};
export const functionHandler = (field: TField, objectKey: string, context: any) => {
  if (!context) return '';
  if (isFunction(field?.[objectKey])) return field?.[objectKey].call(context, context.model, field, context);

  if (isNil(field?.[objectKey])) return true;

  return field?.[objectKey];
};
