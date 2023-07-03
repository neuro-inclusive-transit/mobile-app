import { localStore } from "~/stores/misc/localStore";
import { Journey } from "./journeys";

interface LiveJourney extends Omit<Journey, 'sections'> {
  sections: Array<Journey["sections"][0] | false>;
  isPaused: boolean;
  currentStep: number;
};


export const liveJourney = localStore<LiveJourney | null>(null);
