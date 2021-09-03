/**
 * A default RuleMessageFactory for `min`
 *
 * @type {RuleMessageFactory}
 * @param {*} value a variable to be tested
 * @param params
 * @returns {string}
 */
export default (value, params) => {
  return `${params[0]}以上で入力してください`;
}
