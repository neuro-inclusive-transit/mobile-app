import { dbStore } from '~/stores/misc/dbStore';

import type { Emoji } from "emoji-type";
import type { Coordinate, Address } from "~/_models";

export interface Place {
  icon?: Emoji;
  name?: string;
  location: Coordinate;
  address?: Address;
  currentLocation: boolean;
}

export const places = dbStore<Place>('place');
