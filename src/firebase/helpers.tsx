export const objectToMap = (obj: Object): Map<any, any> => {
  return new Map(
    Array.from(Object.entries(obj), ([k, v]) =>
      v instanceof Object ? [k, objectToMap(v)] : [k, v]
    )
  );
};

export const mapToObject = (map: Map<any, any>): Object => {
  return Object.fromEntries(
    Array.from(map.entries(), ([k, v]) => (v instanceof Map ? [k, mapToObject(v)] : [k, v]))
  );
};
