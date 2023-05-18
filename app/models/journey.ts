import { PlaceModel } from '~/models/place';

export type TimeAndPlace = {
  time: Date;
  place: PlaceModel;
};

export type Minutes = number;

export enum CompanionMode {
  Rarely = "Rarely",
  Sometimes = "Sometimes",
  Often = "Often",
}

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
