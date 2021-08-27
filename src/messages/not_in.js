/**
 * A default RuleMessageFactory for `not_in`
 *
 * @type {RuleMessageFactory}
 * @param {*} value a variable to be tested
 * @param params
 * @returns {string}
 */
export default (value, params) => {
  return `${value}は指定できない文字列です`;
}
