/**
 * @author Funny002
 * @email funnydsu@gmail.com
 * @href https://github.com/Funny002
 * @dateTime 2021/12/3 15:16
 */

import { getType } from './verify';

export const dateFormat = function (format = 'y-m-d', value: Date | string | undefined = new Date(), pad = false): string {
  value = (getType(value) === 'string' ? new Date(value as string) : value) as Date;
  const strPad = (value: number): string => value.toString().padEnd(pad ? 2 : 1, '0');
  const config: { [key: string]: number } = {y: value.getFullYear(), m: value.getMonth() + 1, d: value.getDate(), h: value.getHours(), i: value.getMinutes(), s: value.getSeconds()};
  return format.replace(/[\w]/g, keys => strPad(config[keys]));
};
