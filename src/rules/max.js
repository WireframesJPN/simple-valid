import {getLength} from "../helpers";

/**
 *
 * @param value
 * @param num
 * @returns {boolean}
 */
export default function (value, [num]) {
  return getLength(value) > parseFloat(num);
}
