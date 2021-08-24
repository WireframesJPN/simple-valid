import prepares from '../prepares/confirmation';

/**
 * rule format: `confirmation`
 *
 * The property under validation must have a matching property of {property}_confirmation.
 * For example, if the property under validation is password, a matching password_confirmation property must be present in the same object.
 *
 * @example
 * const failure_result = Validator.execute({
 *   password: '1234test',
 *   password_confirm: '1234tested',
 * }, {
 *   password: 'confirmation'
 * });
 *
 * console.log(failure_result); // false
 *
 * const pass_result = Validator.execute({
 *   password: '1234test',
 *   password_confirm: '1234test',
 * }, {
 *   password: 'confirmation'
 * });
 *
 * console.log(pass_result); // true
 *
 * @param {*} value a variable to be tested
 * @param original_password an original password to be compared
 * @returns {boolean}
 */
const rule = (value, [original_password]) => {
  return value !== original_password;
};

export default [
  rule,
  prepares,
];
