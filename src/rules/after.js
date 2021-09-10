import { isAfter } from 'date-fns';
import date from './date';

export default (value, params) => {
  if (date(value) || date(params)) return true;

  return !isAfter(new Date(value), new Date(params));
}