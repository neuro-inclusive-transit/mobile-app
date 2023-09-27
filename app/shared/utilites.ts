import { HereApiTransportMode } from "~/api";

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
export function enumKeys<O extends object, K extends keyof O = keyof O>(
  obj: O,
): K[] {
  return Object.keys(obj).filter((k) => Number.isNaN(+k)) as K[];
}

export function dateToTime(date: Date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
}

export function transportTypeToIcon(type: HereApiTransportMode) {
  switch (type) {
    case "highSpeedTrain":
    case "intercityTrain":
    case "interRegionalTrain":
      return "directions_railway";
    case "regionalTrain":
    case "cityTrain":
    case "monorail":
      return "train";
    case "bus":
    case "busRapid":
      return "directions_bus";
    case "ferry":
      return "directions_boat";
    case "subway":
      return "directions_subway";
    case "lightRail":
      return "tram";
    case "privateBus":
      return "local_taxi";
    case "flight":
      return "flight";
    case "pedestrian":
    case "walk":
      return "directions_walk";
    case "car":
      return "directions_car";
    case "inclined":
    case "aerial":
    default:
      return "multiple_stop";
  }
}
