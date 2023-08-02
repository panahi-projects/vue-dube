import { get, set, each, isObject, isArray, isFunction, cloneDeep } from 'lodash';

import { ISchema, IModel, TField } from '../interfaces';

// Create a new model by schema default values
const createDefaultObject = (schema: ISchema, obj = {}) => {
  each(schema.fields, (field: TField) => {
    if (field.model && get(obj, field.model) === undefined && field.default !== undefined) {
      if (isFunction(field.default)) {
        set(obj, field.model, field.default(field, schema, obj));
      } else if (isObject(field.default) || isArray(field.default)) {
        set(obj, field.model, cloneDeep(field.default));
      } else set(obj, field.model, field.default);
    }
  });
  return obj;
};

// Get a new model which contains only properties of multi-edit fields
const getMultipleFields = (schema: ISchema) => {
  const res: TField[] = [];
  each(schema.fields, (field) => {
    if (field.multi === true) res.push(field);
  });

  return res;
};

// Merge many models to one 'work model' by schema
const mergeMultiObjectFields = (schema: ISchema, objs: any = {}) => {
  const model: IModel = {};

  const fields = getMultipleFields(schema);

  each(fields, (field) => {
    let mergedValue: any;
    let notSet: boolean = true;
    const path: string = field.model || '';

    each(objs, (obj) => {
      const v = get(obj, path);
      if (notSet) {
        mergedValue = v;
        notSet = false;
      } else if (mergedValue !== v) {
        mergedValue = undefined;
      }
    });

    set(model, path, mergedValue);
  });

  return model;
};

const slugifyFormID = (schema: TField, prefix: string = '') => {
  // Try to get a reasonable default id from the schema,
  // then slugify it.
  if (typeof schema.fieldId !== 'undefined') {
    // If an ID's been explicitly set, use it unchanged
    return prefix + schema.fieldId;
  } else {
    // Return the slugified version of either:
    return (
      prefix +
      (schema.inputName || schema.label || schema.model || '')
        // NB: This is a very simple, conservative, slugify function,
        // avoiding extra dependencies.
        .toString()
        .trim()
        .toLowerCase()
        // Spaces & underscores to dashes
        .replace(/ |_/g, '-')
        // Multiple dashes to one
        .replace(/-{2,}/g, '-')
        // Remove leading & trailing dashes
        .replace(/^-+|-+$/g, '')
        // Remove anything that isn't a (English/ASCII) letter, number or dash.
        .replace(/([^a-zA-Z0-9-]+)/g, '')
    );
  }
};

const slugify = (name: string = '') => {
  // Return the slugified version of either:
  return (
    name
      // NB: This is a very simple, conservative, slugify function,
      // avoiding extra dependencies.
      .toString()
      .trim()
      // .toLowerCase()
      // Spaces to dashes
      .replace(/ /g, '-')
      // Multiple dashes to one
      .replace(/-{2,}/g, '-')
      // Remove leading & trailing dashes
      .replace(/^-+|-+$/g, '')
      // Remove anything that isn't a (English/ASCII) letter, number or dash.
      .replace(/([^a-zA-Z0-9-_/./:]+)/g, '')
  );
};

export { createDefaultObject, getMultipleFields, mergeMultiObjectFields, slugifyFormID, slugify };
