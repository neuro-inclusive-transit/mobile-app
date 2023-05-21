import { localStore } from './misc/localStore';
import type { Place, Journey } from '~/stores';
import { JourneyPlanMode, CompanionMode, PreferredTransportation, PreferredJourneyMode } from '~/types';


export const planJourney = localStore<JourneyPlan>({
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
});


export type JourneyPlan = {
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
