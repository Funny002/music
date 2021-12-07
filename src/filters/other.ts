import { toUnit } from '../utils/other';

export const sizeToUnit = (value: any): string => {
  const val = parseInt(value || 'null');
  if (isNaN(val)) return '';
  const units = [
    {value: 1024, unit: 'b'},
    {value: 1024, unit: 'Kb'},
    {value: 1024, unit: 'Mb'},
    {value: 1024, unit: 'Gb'},
    {value: 1024, unit: 'Tb'},
    {value: 1024, unit: 'Pb'},
    {value: 1024, unit: 'Eb'}
  ];
  const data = toUnit(value, units);
  if (data === -1) return value + 'b';
  return data;
};
