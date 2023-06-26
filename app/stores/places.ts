import { dbStore } from '~/stores/misc/dbStore';

import type { Emoji } from "emoji-type";
import type { Coordinate, Address } from "~/stores/misc/types";

export interface Place {
  icon?: Emoji;
  name?: string;
  location: Coordinate;
  address?: Address;
  currentLocation: boolean;
}

export type TimeAndPlace = {
  time: Date;
  place: Place;
};

export const places = dbStore<Place>('place', [
  {
    icon: '🏠',
    name: 'Zuhause',
    location: {
      lat: 50.971558,
      lng: 7.056926,
    },
    address: {
      street: 'Rotkäppchenweg 1',
      postcode: '51067',
      city: 'Köln',
      country: 'Germany',
    },
    currentLocation: false,
  },
  {
    icon: '⛪️',
    name: 'Kölner Dom',
    location: {
      lat: 50.941278,
      lng: 6.958281,
    },
    address: {
      street: 'Domkloster 4',
      postcode: '50667',
      city: 'Köln',
      country: 'Germany',
    },
    currentLocation: false,
  },
]);
