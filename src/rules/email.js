/**
 * rule format: `email`
 *
 * The property under validation must be formatted as an email address.
 *
 * @example
 * const failure_result = Validator.execute({ email: 'test }, { email: 'email' });
 *
 * console.log(Validator.execute({ email: 'test' }, { email: 'email' })); // false
 * console.log(Validator.execute({ email: 'test@example.com' }, { email: 'email' })); // true
 *
 * @type {Rule}
 * @param {*} value a variable to be tested
 * @param params
 * @returns {Promise<boolean>}
 */
export default (value, params) => new Promise((resolve) => {
  const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  resolve(!pattern.test(value));
})
