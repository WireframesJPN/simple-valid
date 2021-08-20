/**
 *
 * @param value
 * @param params
 * @returns {boolean}
 */
export default function (value, params) {
  return value === ''
      || value === null
      || value === undefined;
}
