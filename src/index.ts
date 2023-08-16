import { App } from 'vue';
import * as fieldComponents from '@/utils/loader';

const installComponents = (app: App<Element>): void => {
  Object.entries(fieldComponents).forEach(([key, value]) => {
    app.component(key, value);
  });
};

export * from '@/utils/loader';
export { DynamicBuilder } from '@/components';
export * from '@/interfaces';
export default { installComponents };
