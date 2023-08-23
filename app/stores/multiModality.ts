import { localStore } from './misc/localStore';


export type MultiModalityStore = {
  primary: "visual" | "auditory",
  audioSpeed?: number,
}

export const multiModality = localStore<MultiModalityStore>({
  primary: "visual",
});
