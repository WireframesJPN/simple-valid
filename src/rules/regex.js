/**
 * rule format: `regex:{pattern}`
 *
 * The property under validation must match the given regular expression.
 * this rule uses the Javascript `RegExp` class and its `match` method.
 * The pattern specified should obey the same formatting required by `match` method and thus also include valid delimiters.
 *
 * @type {Rule}
 * @param {*} value a variable to be tested
 * @param {string} pattern
 * @returns {boolean}
 */
export default (value, [pattern]) => {
  const regExp = new RegExp(pattern);
  const result = value.match(regExp);
  return result === null || !result[0];
}
