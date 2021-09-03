/**
 * rule format: `not_in:{value_1},{value_2},...`
 *
 * The property under validation must not be included in the given list of values.
 *
 * @type {Rule}
 * @param {*} value a variable to be tested
 * @param {string[]} params A list of the given values at the rule format
 * @returns {Promise<boolean>}
 */
export default (value, params) => new Promise((resolve) => {
  let result = false;

  for (let i = 0; i < params.length; i++) {
    if (value === params[i]) result = true;
  }

  resolve(result);
})
