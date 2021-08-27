/**
 * A default RuleMessageFactory for `between`
 *
 * @type {RuleMessageFactory}
 * @param {*} value a variable to be tested
 * @param {[(string|number), (string|number)]} params a pair of number which indicates the range of `value`
 * @returns {string}
 */
export default (value, params) => {
  return `${params[0]}〜${params[1]}の長さで入力してください`;
}
