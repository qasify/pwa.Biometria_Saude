type Primitive = string | number | boolean | null | undefined;

type PlainObject = {
  [key: string]: Primitive | PlainObject | PlainObject[];
};

const toCamelCase = (str: string): string => {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};

const keysToCamelCase = <T extends PlainObject | PlainObject[]>(obj: T): T => {
  if (Array.isArray(obj)) {
    return obj.map((item) => keysToCamelCase(item)) as T;
  } else if (
    obj !== null &&
    typeof obj === "object" &&
    obj.constructor === Object
  ) {
    return Object.keys(obj).reduce((result, key) => {
      const camelCaseKey = toCamelCase(key);
      (result as PlainObject)[camelCaseKey] = keysToCamelCase(
        (obj as PlainObject)[key] as PlainObject[]
      );
      return result;
    }, {} as PlainObject) as T;
  }
  return obj as T;
};

export { keysToCamelCase };
