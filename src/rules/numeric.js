/**
 * rule format: `numeric`
 *
 * The property under validation must be numeric.
 *
 * @type {Rule}
 * @param {*} value a variable to be tested
 * @param params
 * @returns {Promise<boolean>}
 */
export default (value, params) => new Promise((resolve) => {
  if (!['string', 'number'].includes(typeof value)) resolve(true);
  if (value === '') resolve(true);

  resolve(isNaN(value));
})
