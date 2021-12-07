/**
 * @author Funny002
 * @email funnydsu@gmail.com
 * @href https://github.com/Funny002
 * @dateTime 2021/12/3 15:15
 */

/**
 * 限制大小
 * @param value
 * @param maxValue
 * @param minValue
 * @constructor
 */
export const Size = function (value: number, maxValue = Infinity, minValue = -Infinity): number {
  return Math.max(Math.min(maxValue, value), minValue);
};

/**
 * 保留小数位
 * @param value
 * @param long
 * @param round
 */
export const roundFixed = function (value: number | string, long = 2, round = true): number {
  value = value.toString();
  if (/^-?\d+$/.test(value)) return parseInt(value);
  if (/^-?\d+\.\d+$/.test(value)) {
    const matchArray = value.match(RegExp(`^(\\d+\)\.(\\d{0,${long}})(\\d)`));
    if (matchArray) {
      const valueList: string[] = [matchArray[1], matchArray[2]];
      if (round && parseInt(matchArray[3]) >= 5) {
        const keys: number = long === 0 ? 0 : 1;
        valueList[keys] = (parseInt(matchArray[keys]) + 1).toString();
      }
      return parseFloat(valueList.join('.'));
    }
  }
  return NaN;
};
