import type { Emoji } from "emoji-type";

export type Coordinate = {
  lat: number;
  lng: number;
};

export type Address = {
  street: string;
  postcode: string;
  city: string;
  country: string;
};

export interface PlaceModel {
  id: number;
  icon?: Emoji;
  name?: string;
  location: Coordinate;
  address?: Address;
  currentLocation: boolean;
}
