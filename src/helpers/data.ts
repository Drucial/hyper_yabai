export const formatOutput = (data: string) => {
  try {
    return toCamelCase(JSON.parse(data));
  } catch (error) {
    return data;
  }
};

/**
 * Converts object keys from kebab-case/snake_case to camelCase
 * @param obj The object to transform
 * @returns A new object with camelCased keys
 */
export function toCamelCase<T extends object>(obj: T): { [key: string]: T[keyof T] } {
  if (Array.isArray(obj)) {
    return obj.map(item => (typeof item === 'object' && item !== null ? toCamelCase(item) : item));
  } else if (obj !== null && typeof obj === 'object') {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      // Convert key to camelCase
      const camelKey = key.replace(/([-_][a-z])/gi, ($1) => {
        return $1.toUpperCase().replace('-', '').replace('_', '');
      });

      // Handle nested objects and arrays
      const newValue = value && typeof value === 'object'
        ? toCamelCase(value)
        : value;

      return { ...acc, [camelKey]: newValue };
    }, {});
  }

  return obj;
}
