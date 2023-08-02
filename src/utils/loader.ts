let fieldComponents: any = {};
const componentsList = ['fieldTextbox', 'fieldSelect', 'fieldCheckbox', 'fieldTextarea', 'fieldRadio'];

componentsList.forEach(async (componentName) => {
  const component = await import(`../components/fields/${componentName}.vue`);
  console.log(componentName, component.default);
  fieldComponents[componentName as keyof typeof fieldComponents] = component.default;
});

export default fieldComponents;
