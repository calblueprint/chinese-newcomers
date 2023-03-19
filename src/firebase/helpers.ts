// takes firebase visible object and converts to map
const objectToBooleanMap = (obj: object): Map<string, boolean> =>
  new Map(
    Array.from(Object.entries(obj), ([k, v]) =>
      v instanceof Object ? [k, objectToBooleanMap(v)] : [k, v],
    ),
  );

export default objectToBooleanMap;
