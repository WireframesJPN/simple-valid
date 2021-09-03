import { getLength } from '../helpers';

/**
 * rule format: `max:{num}`
 *
 * The property under validation must be less than or equal to a maximum value.
 * Strings, numerics, arrays, and files are evaluated in the same fashion as the `size` rule.
 *
 * @example
 * console.log(Validator.execute({ target: 'test' }, { target: 'max:6' })); // true
 * console.log(Validator.execute({ target: 'tested' }, { target: 'max:6' })); // true
 * console.log(Validator.execute({ target: 'tested_' }, { target: 'max:6' })); // false
 *
 * console.log(Validator.execute({ target: [1, 1, 1, 1] }, { target: 'max:6' })); // true
 * console.log(Validator.execute({ target: [1, 1, 1, 1, 1, 1] }, { target: 'max:6' })); // true
 * console.log(Validator.execute({ target: [1, 1, 1, 1, 1, 1, 1] }, { target: 'max:6' })); // false
 *
 * console.log(Validator.execute({ target: 4 }, { target: 'max:6' })); // true
 * console.log(Validator.execute({ target: 6 }, { target: 'max:6' })); // true
 * console.log(Validator.execute({ target: 7 }, { target: 'max:6' })); // false
 *
 * @type {Rule}
 * @param {*} value a variable to be tested
 * @param {string|number} num a number that the value must be less than or equals to
 * @returns {Promise<boolean>}
 */
export default (value, [num]) => new Promise((resolve) => {
  resolve(getLength(value) > parseFloat(num));
})
