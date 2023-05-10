// takes firebase visible object and converts to map
export const objectToBooleanMap = (obj: object): Map<string, boolean> =>
  new Map(
    Array.from(Object.entries(obj), ([k, v]) =>
      v instanceof Object ? [k, objectToBooleanMap(v)] : [k, v],
    ),
  );

export const mapToObject = (map: Map<string, boolean>): object => Object.fromEntries(Array.from(map.entries(), ([k, v]) => [k, v]))

