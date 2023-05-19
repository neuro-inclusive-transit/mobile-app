import { PlaceModel, JourneyModel, JourneyPlanMode, CompanionMode, Minutes, PreferredTransportation } from '~/models';


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
