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
    name: 'Home',
    location: {
      lat: 51.441642,
      lng: 5.469722,
    },
    address: {
      street: 'Kerkstraat 1',
      postcode: '5595 CJ',
      city: 'Leende',
      country: 'Netherlands',
    },
    currentLocation: false,
  },
  {
    icon: '🏢',
    name: 'Work',
    location: {
      lat: 51.441642,
      lng: 5.469722,
    },
    address: {
      street: 'Kerkstraat 1',
      postcode: '5595 CJ',
      city: 'Leende',
      country: 'Netherlands',
    },
    currentLocation: false,
  },
  {
    icon: '🏫',
    name: 'School',
    location: {
      lat: 51.441642,
      lng: 5.469722,
    },
    address: {
      street: 'Kerkstraat 1',
      postcode: '5595 CJ',
      city: 'Leende',
      country: 'Netherlands',
    },
    currentLocation: false,
  },
]);
