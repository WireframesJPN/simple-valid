import min from './min';
import max from './max';

/**
 *
 * @param value
 * @param min_num
 * @param max_num
 * @returns {boolean}
 */
export default function (value, [min_num, max_num]) {
  const min_failed = min(value, [min_num]);
  const max_failed = max(value, [max_num]);

  return min_failed || max_failed;
}
