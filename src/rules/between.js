import min from './min';
import max from './max';

export default function (value, [min_num, max_num]) {
  const min_passed = min(value, [min_num]);
  const max_passed = max(value, [max_num]);

  return min_passed && max_passed;
}
