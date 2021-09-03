export default (value, params) => {
  return (!(value === 1 || value === true || ['yes', '1', 'true', 'on'].includes(value)));
}
