import { localStore } from "~/stores/misc/localStore";
import { Journey } from "./journeys";

export interface LiveJourney extends Omit<Journey, 'sections'> {
  sections: Array<Journey["sections"][0] | false>;
  isPaused: boolean;
  currentSection: number;
  currentAction: number;
  currentIntermediateStop: number;
};


export const liveJourney = localStore<LiveJourney | null>(null);
