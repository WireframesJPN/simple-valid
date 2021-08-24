/**
 *
 * @param {*} values
 * @param {string} key
 * @param {RuleFunction} rule
 * @returns {RuleFunction}
 */
export default function (values, key, rule) {
  let confirmation_key = key + '_confirmation';
  if (values[confirmation_key] === undefined) {
    rule[1] = '';
  } else {
    rule[1] = values[confirmation_key];
  }
  return rule;
}
