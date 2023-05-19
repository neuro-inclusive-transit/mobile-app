import { TimeAndPlace, CompanionMode, Minutes } from '~/models';

export interface JourneyModel {
  id: number;
  departure: TimeAndPlace,
  arrival: TimeAndPlace,
  reminderBefore: Minutes;
  companionMode: CompanionMode;
  stops: {
    departure: TimeAndPlace,
    duration: Minutes,
  }[];
}
