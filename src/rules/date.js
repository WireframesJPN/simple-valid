import { isValid } from 'date-fns';

export default (value, params) => {
  return !isValid(new Date(value));
}