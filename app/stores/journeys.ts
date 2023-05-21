import { dbStore } from '~/stores/misc/dbStore';

import { TimeAndPlace, CompanionMode, Minutes } from '~/_models';

export interface Journey {
  _id: string;
  departure: TimeAndPlace,
  arrival: TimeAndPlace,
  reminderBefore: Minutes;
  companionMode: CompanionMode;
  stops: {
    departure: TimeAndPlace,
    duration: Minutes,
  }[];
}

export const journeys = dbStore<Journey>('journey');
