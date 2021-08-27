export default (value, params) => {
  if (!['string', 'number'].includes(typeof value)) return false;
  if (value === '') return false;

  return !isNaN(value);
}
