import { Place } from "~/stores";

export type TimeAndPlace = {
  time: Date;
  place: Place;
};

export type Minutes = number;

export enum CompanionMode {
  Rarely = "rarely",
  Sometimes = "sometimes",
  Often = "often",
}

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
  LeastChanges = 'least-changes',
  LeastWalking = 'least-walking',
}

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
