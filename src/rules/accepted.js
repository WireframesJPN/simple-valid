export default (value, params) => {
  let _value = (typeof value === 'string' || value instanceof String)?value.toLowerCase():value;
  return (!(value === 1 || value === true || ['yes', '1', 'true', 'on'].includes(_value)));
}
