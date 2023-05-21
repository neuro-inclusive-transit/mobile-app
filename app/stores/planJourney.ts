import { writable } from "svelte/store";
import type { Place, Journey } from '~/stores';
import { JourneyPlanMode, CompanionMode, PreferredTransportation, PreferredJourneyMode } from '~/_models';

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


export type JourneyPlanStore = {
  departure: Place | null;
  arrival: Place | null;
  time: {
    type: JourneyPlanMode;
    value: Date;
  }
  options: Journey[];
  companionMode: CompanionMode;
  reminderBefore: number;
  preferredTransport: PreferredTransportation;
  preferredJourneyMode: PreferredJourneyMode;
}
