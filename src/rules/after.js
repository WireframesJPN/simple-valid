import dayjs from "dayjs";

export default (value, params) => {
  const day = dayjs(value);
  const after = dayjs(params);

  if ( !day.isValid() || !after.isValid() ) {
    return false;
  }

  return day.isAfter(after);
}