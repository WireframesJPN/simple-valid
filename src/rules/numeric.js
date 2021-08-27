/**
 * rule format: `numeric`
 *
 * The property under validation must be numeric.
 *
 * @type {Rule}
 * @param {*} value a variable to be tested
 * @param params
 * @returns {boolean}
 */
export default (value, params) => {
  if (!['string', 'number'].includes(typeof value)) return true;
  if (value === '') return true;

  return isNaN(value);
}
