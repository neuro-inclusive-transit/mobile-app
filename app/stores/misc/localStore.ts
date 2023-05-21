import { writable } from "svelte/store";

export function localStore<T>(initialData: T) {
  const { subscribe, set, update } = writable(initialData);

  return {
    subscribe,
    set,
    update,
    reset : () => set(initialData)
  };
}
