/**
 * rule format: `required`
 *
 * The property under validation must be present in the input data and not empty.
 * A property is considered "empty" if one of the following conditions are true:
 *   * The value is null.
 *   * The value is undefined.
 *   * The value is empty string.
 *   * The value is empty array.
 *
 * @type {Rule}
 * @param {*} value a variable to be tested
 * @param params
 * @returns {boolean}
 */
export default (value, params) => {
  // in case of null or undefined
  if (value === null || value === undefined) {
    return true;
  }

  // in case of String
  if (typeof value === 'string') {
    return value === '';
  }

  // in case of Array
  if (Array.isArray(value)) {
    return value.length === 0;
  }

  return false;
}
