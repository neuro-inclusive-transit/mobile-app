import { localStore } from './misc/localStore';
import type { Place } from '~/stores';
import { JourneyPlanMode, CompanionMode, PreferredTransportation, PreferredJourneyMode } from '~/types';
import type { HereApiRoute } from '~/api/routes';


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
  preferredRoute: null,
});


export type JourneyPlan = {
  departure: Place | null;
  arrival: Place | null;
  time: {
    type: JourneyPlanMode;
    value: Date;
  }
  options: Promise<HereApiRoute[]>;
  companionMode: CompanionMode;
  reminderBefore: number;
  preferredTransport: PreferredTransportation;
  preferredJourneyMode: PreferredJourneyMode;
  preferredRoute: HereApiRoute | null;
}
