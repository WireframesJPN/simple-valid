/**
 * rule format: `required`
 *
 * The property under validation must be present in the input data and not empty.
 * A property is considered "empty" if one of the following conditions are true:
 *   * The value is null.
 *   * The value is undefined.
 *   * The value is empty string.
 *
 * @param {*} value a variable to be tested
 * @param params
 * @returns {boolean}
 */
export default (value, params) => {
  return value === ''
    || value === null
    || value === undefined;
}
