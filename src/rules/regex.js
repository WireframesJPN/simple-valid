export default function (value, [pattern]) {
  const regExp = new RegExp(pattern);
  const result = value.match(regExp);

  return !!result && !!result[0];
}
