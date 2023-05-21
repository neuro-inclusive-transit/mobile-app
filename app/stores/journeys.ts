import { dbStore } from '~/stores/misc/dbStore';
import { Minutes } from '~/stores/misc/types';
import { TimeAndPlace } from '~/stores/places';
import { CompanionMode } from '~/types';

export interface Journey {
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
