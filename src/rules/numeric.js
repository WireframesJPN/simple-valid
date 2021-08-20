/**
 *
 * @param value
 * @param params
 * @returns {*|boolean}
 */
export default (value, params) => {
  if (!['string', 'number'].includes(typeof value)) return true;
  if (value === '') return true;

  return isNaN(value);
}
