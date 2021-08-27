export default (value, params) => {
  for (let i = 0; i < params.length; i++) {
    if (value === params[i]) return false;
  }

  return true;
}
