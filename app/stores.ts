import { writable } from "svelte/store";
import type { PlaceModel, JourneyModel, Minutes } from '~/models';
import { JourneyPlanMode, CompanionMode, PreferredTransportation, PreferredJourneyMode } from '~/models';

export const planJourney = writable({
  departure: null,
  arrival: null,
  time: {
    type: JourneyPlanMode.Departure,
    value: new Date(),
  },
  options: [],
  companionMode: CompanionMode.Rarely,
  reminderBefore: 0,
  preferredTransport: PreferredTransportation.Car,
  preferredJourneyMode: PreferredJourneyMode.Fastest,
} as JourneyPlanStore);


type JourneyPlanStore = {
  departure: PlaceModel | null;
  arrival: PlaceModel | null;
  time: {
    type: JourneyPlanMode;
    value: Date;
  }
  options: JourneyModel[];
  companionMode: CompanionMode;
  reminderBefore: Minutes;
  preferredTransport: PreferredTransportation;
  preferredJourneyMode: PreferredJourneyMode;
}
