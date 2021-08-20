import prepares from '../prepares/confirmation';

/**
 *
 * @param value
 * @param original_password
 * @returns {boolean}
 */
const rule = (value, [original_password]) => {
  return value !== original_password;
};

export default [
  rule,
  prepares
]
