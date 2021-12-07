/**
 * @author Funny002
 * @email funnydsu@gmail.com
 * @href https://github.com/Funny002
 * @dateTime 2021/12/3 15:16
 */

/**
 * 获取类型
 * @param value
 */
export const getType = function (value: any): string {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
};

/**
 * 判断类型
 * @param value
 * @param type
 */
export const hasType = function (value: any, type: string): boolean {
  return getType(value) === type.toLowerCase();
};

/**
 * 是否，空|无值 ，undefined | null | [] | {}
 * @param value
 */
export const isEmpty = function (value: any): boolean {
  switch (getType(value)) {
    case 'string':
      return value === '';
    case 'array':
      return value.length == 0;
    case 'object':
      return Object.keys(value).length === 0;
    case 'null':
      return true;
    case 'undefined':
      return true;
    default:
      throw new Error('value类型错误，undefined | null | [] | {}');
  }
};
