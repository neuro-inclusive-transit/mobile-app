import { localStore } from "~/stores/misc/localStore";
import { Journey } from "./journeys";


export const liveJourney = localStore<Journey & {
  isPaused: boolean;
  currentStep: number;
} | null>(null);
