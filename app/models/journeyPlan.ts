import { PlaceModel } from '~/models/place';
import { JourneyModel, CompanionMode, Minutes } from '~/models/journey';

export enum JourneyPlanMode {
  Departure = 'departure',
  Arrival = 'arrival',
}

export enum PreferredTransportation {
  Car = 'car',
  Bus = 'bus',
  LongDistanceTrain = 'long-distance-train',
  SubUrbanTrain = 'sub-urban-train',
}

export enum PreferredJourneyMode {
  Fastest = 'fastest',
  ShortestPaths = 'shortest-paths',
}

export interface JourneyPlanModel {
  departure: PlaceModel;
  arrival: PlaceModel;
  time: {
    type: JourneyPlanMode;
    value: Date | null;
  }
  options: JourneyModel[];
  companionMode: CompanionMode;
  reminderBefore: Minutes;
  preferredTransport: PreferredTransportation;
}
