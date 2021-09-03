import { getLength } from '../helpers';

/**
 * rule format: `min:{num}`
 *
 * The property under validation must be greater than or equal to a minimum value.
 * Strings, numerics, arrays, and files are evaluated in the same fashion as the `size` rule.
 *
 * @example
 * console.log(Validator.execute({ target: 'test' }, { target: 'min:4' })); // true
 * console.log(Validator.execute({ target: 'tested' }, { target: 'min:4' })); // true
 * console.log(Validator.execute({ target: 'tes' }, { target: 'min:4' })); // false
 *
 * console.log(Validator.execute({ target: [1, 1, 1, 1] }, { target: 'min:4' })); // true
 * console.log(Validator.execute({ target: [1, 1, 1, 1, 1, 1] }, { target: 'min:4' })); // true
 * console.log(Validator.execute({ target: [1, 1, 1] }, { target: 'min:4' })); // false
 *
 * console.log(Validator.execute({ target: 4 }, { target: 'min:4' })); // true
 * console.log(Validator.execute({ target: 6 }, { target: 'min:4' })); // true
 * console.log(Validator.execute({ target: 3 }, { target: 'min:4' })); // false
 *
 * @type {Rule}
 * @param {*} value a variable to be tested
 * @param {string|number} min_num a number that the value must be greater than or equals to
 * @returns {boolean}
 */
export default (value, [num]) => {
  return getLength(value) < parseFloat(num);
}
