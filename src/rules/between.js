import min from './min';
import max from './max';

/**
 * rule format: `between:{min},{max}`
 *
 * The property under validation must have a size between the given min and max.
 * Strings, numerics, and arrays are evaluated in the same fashion as the `size` rule.
 *
 * @example
 * console.log(Validator.execute({ target: 'test' }, { target: 'between:4,6' })); // true
 * console.log(Validator.execute({ target: 'tested' }, { target: 'between:4,6' })); // true
 * console.log(Validator.execute({ target: 'tes' }, { target: 'between:4,6' })); // false
 * console.log(Validator.execute({ target: 'tested_' }, { target: 'between:4,6' })); // false
 *
 * console.log(Validator.execute({ target: [1, 1, 1, 1] }, { target: 'between:4,6' })); // true
 * console.log(Validator.execute({ target: [1, 1, 1, 1, 1, 1] }, { target: 'between:4,6' })); // true
 * console.log(Validator.execute({ target: [1, 1, 1] }, { target: 'between:4,6' })); // false
 * console.log(Validator.execute({ target: [1, 1, 1, 1, 1, 1, 1] }, { target: 'between:4,6' })); // false
 *
 * console.log(Validator.execute({ target: 4 }, { target: 'between:4,6' })); // true
 * console.log(Validator.execute({ target: 6 }, { target: 'between:4,6' })); // true
 * console.log(Validator.execute({ target: 3 }, { target: 'between:4,6' })); // false
 * console.log(Validator.execute({ target: 7 }, { target: 'between:4,6' })); // false
 *
 * @param {*} value a variable to be tested
 * @param {string|number} min_num a number that the value must be greater than or equals to
 * @param {string|number} max_num a number that the value must be less than or equals to
 * @returns {boolean}
 */
export default (value, [min_num, max_num]) => {
  const min_failed = min(value, [min_num]);
  const max_failed = max(value, [max_num]);

  return min_failed || max_failed;
}
