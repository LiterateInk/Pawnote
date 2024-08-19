export const propertyCaseInsensitive = (prop: string, value: any): any => {
  return {
    [prop]: value,
    [prop[0].toUpperCase() + prop.substring(1)]: value
  };
};
