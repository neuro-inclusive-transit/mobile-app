/**
 * Returns an array of enum keys
 * @param obj enum object
 * @returns array of enum keys
 * @example
 * enum MyEnum {
 *  A = 'a',
 *  B = 'b'
 * }
 * enumKeys(MyEnum) // ['A', 'B']
 * enumKeys(MyEnum).map(k => MyEnum[k]) // ['a', 'b']
 *
 * @see https://www.petermorlion.com/iterating-a-typescript-enum/
 */
export function enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
  return Object.keys(obj).filter(k => Number.isNaN(+k)) as K[];
}
