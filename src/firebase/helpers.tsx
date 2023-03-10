export const objectToMap = (obj: object): Map<any, any> =>
  new Map(
    Array.from(Object.entries(obj), ([k, v]) =>
      v instanceof Object ? [k, objectToMap(v)] : [k, v],
    ),
  );

export const mapToObject = (map: Map<any, any>): object =>
  Object.fromEntries(
    Array.from(map.entries(), ([k, v]) =>
      v instanceof Map ? [k, mapToObject(v)] : [k, v],
    ),
  );
