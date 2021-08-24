/**
 *
 * @param {*} values
 * @param {string} key
 * @param {Rule} rule
 * @returns {Rule}
 */
export default function (values, key, rule) {
  const confirmation_key = `${key}_confirmation`;

  rule[1] = values[confirmation_key] === undefined ? '' : values[confirmation_key];

  return rule;
}
