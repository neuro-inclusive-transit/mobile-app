import { writable } from "svelte/store";
import * as geolocation from "@nativescript/geolocation";

export type GeoLocationStore = {
  data: {
    latitude: number;
    longitude: number;
    altitude: number;
    horizontalAccuracy: number;
    verticalAccuracy: number;
    speed: number;
    direction: number;
    timestamp: Date;
  };
  isActivated: boolean;
};

export const currentLocation = writable({
  data: {
    latitude: 0,
    longitude: 0,
    altitude: 0,
    horizontalAccuracy: 0,
    verticalAccuracy: 0,
    speed: 0,
    direction: 0,
    timestamp: new Date(),
  },
  isActivated: false,
} as GeoLocationStore);

const isEnableLocation = await geolocation.isEnabled();

if (!isEnableLocation) {
  await geolocation.enableLocationRequest();
}

let watchId: number;

export const startWatchLocation = () => {
  watchId = geolocation.watchLocation(
    (location: geolocation.Location) => {
      currentLocation.update((current) => {
        return {
          ...current,
          data: {
            latitude: location.latitude,
            longitude: location.longitude,
            altitude: location.altitude,
            horizontalAccuracy: location.horizontalAccuracy,
            verticalAccuracy: location.verticalAccuracy,
            speed: location.speed,
            direction: location.direction,
            timestamp: location.timestamp,
          },
        };
      });
    },
    (e) => {
      console.log(e);
    },
  );
};

export const stopWatchLocation = () => {
  geolocation.clearWatch(watchId);

  currentLocation.update((current) => {
    return {
      ...current,
      isActivated: false,
    };
  });
};
