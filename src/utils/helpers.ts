import { KCSelectOptions } from './types';

export const capitalize = (string: string): string =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const convertToLabel = (string: string): string => {
  let capitalized = string.charAt(0).toUpperCase() + string.slice(1);
  if (capitalized.includes('_')) {
    capitalized = capitalized.replace('_', ' ');
  }

  return capitalized;
};

export const selectOptions = (data: any): KCSelectOptions[] => {
  return Object.keys(data).map(key => ({
    label: convertToLabel(key),
    value: key,
  }));
};
