export const formatOutput = (data: string) => {
  return toCamelCase(JSON.parse(data));
};

/**
 * Converts object keys from kebab-case/snake_case to camelCase
 * @param obj The object to transform
 * @returns A new object with camelCased keys
 */
export function toCamelCase<T extends object>(obj: T): { [key: string]: any } {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    // Convert key to camelCase
    const camelKey = key.replace(/([-_][a-z])/gi, ($1) => {
      return $1.toUpperCase().replace('-', '').replace('_', '');
    });

    // Handle nested objects and arrays
    const newValue = value && typeof value === 'object'
      ? Array.isArray(value)
        ? value.map(item => typeof item === 'object' ? toCamelCase(item) : item)
        : toCamelCase(value)
      : value;

    return { ...acc, [camelKey]: newValue };
  }, {});
}
