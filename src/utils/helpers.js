// General functions that could be used in multiple components

// Fetches a nested object if it exists, otherwise return callback
export const getPropIfExists = function (obj, key, fallback) {
  try {
    const prop = key.split(".").reduce(function (o, k) {
      if (!o) {
        return o;
      } else {
        const split = k.split("[");
        if (split.length === 1) return o[k];
        const i = parseInt(split[1][0], 10);
        return o[split[0]][i];
      }
    }, obj);
    if (!prop) return fallback;
    return prop;
  } catch (e) {
    return fallback;
  }
};
// Inserts a dot every 3 values in a number
export const formatThousands = function (num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
