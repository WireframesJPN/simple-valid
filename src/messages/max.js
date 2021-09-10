/**
 * A default RuleMessageFactory for `max`
 *
 * @type {RuleMessageFactory}
 * @param {*} value a variable to be tested
 * @param params
 * @returns {string}
 */
export default (values, params) => {
  return `${params[0]}以下で入力してください`;
}
