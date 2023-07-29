let fieldComponents: any = {};
const componentsList = ['fieldTextbox'];

componentsList.forEach(async (componentName) => {
  const component = await import(`../components/fields/${componentName}.vue`);
  console.log(componentName, component.default);
  fieldComponents[componentName as keyof typeof fieldComponents] = component.default;
});

export default fieldComponents;
