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
  options: new Promise((resolve, reject) => { resolve([]) }),
  companionMode: null,
  reminderBefore: null,
  preferredTransport: null,
  preferredJourneyMode: null,
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
  companionMode: CompanionMode | null;
  reminderBefore: number | null;
  preferredTransport: PreferredTransportation | null;
  preferredJourneyMode: PreferredJourneyMode | null;
  preferredRoute: HereApiRoute | null;
}
