import { roundFixed } from './limit';

/**
 * @author Funny002
 * @email funnydsu@gmail.com
 * @href https://github.com/Funny002
 * @dateTime 2021/12/3 15:15
 */
type Units = { value: number, unit: string }[]
export const toUnit = function (value: number, units: Units, precision = 2): string | -1 {
  for (const unit of units) {
    const {value: v, unit: u} = unit;
    if (value < v || v === 0) return value + u;
    value = roundFixed(value / v, precision);
  }
  return -1;
};
