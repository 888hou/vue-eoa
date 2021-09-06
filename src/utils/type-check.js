export function isObject(value) {
  return typeof value === 'object';
}

export function isArray(value) {
  return typeof Array.isArray(value);
}

export function isNull(value) {
  return value === null;
}