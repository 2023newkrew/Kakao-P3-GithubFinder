export function filterExistingKeys(source, target) {
  return Object.keys(source).reduce((filtered, key) => {
    filtered[key] = target[key];
    return filtered;
  }, {});
}
