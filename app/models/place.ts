import type { Emoji } from "emoji-type";
import type { Coordinate, Address } from "./globals";
export interface PlaceModel {
  id: number;
  icon?: Emoji;
  name?: string;
  location: Coordinate;
  address?: Address;
  currentLocation: boolean;
}
