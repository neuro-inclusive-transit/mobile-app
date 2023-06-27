import { dbStore } from "~/stores/misc/dbStore";
import { Minutes } from "~/stores/misc/types";
import { Place } from "~/stores/places";
import { CompanionMode, JourneyPlanMode } from "~/types";
import { HereApiRoute } from "~/api/routes";

export interface Journey {
  departure: Place;
  arrival: Place;
  time: {
    type: JourneyPlanMode;
    value: Date;
  };
  reminderBefore: Minutes;
  companionMode: CompanionMode;
  sections: HereApiRoute["sections"];
}

export const journeys = dbStore<Journey>("journey", [
  {
    time: {
      type: JourneyPlanMode.Departure,
      value: new Date("2023-06-27T09:00:28.519Z"),
    },
    departure: {
      icon: "🏠",
      name: "Zuhause",
      location: {
        lat: 51.031330,
        lng: 7.030140,
      },
      address: {
        street: "Finkelsteinstraße 19",
        postcode: "51375",
        city: "Leverkusen",
        country: "Germany",
      },
      currentLocation: false,
    },
    arrival: {
      icon: "🐘",
      name: "Kölner Zoo",
      location: {
        lat: 50.959229,
        lng: 6.973540,
      },
      address: {
        street: "Riehler Str. 173",
        postcode: "50735",
        city: "Köln",
        country: "Germany",
      },
      currentLocation: false,
    },
    reminderBefore: 15,
    companionMode: CompanionMode.Rarely,
    sections: [
      {
        id: "R0-S0",
        type: "pedestrian",
        departure: {
          time: "2023-06-27T11:24:00+02:00",
          place: {
            type: "place",
            location: {
              lat: 51.03133,
              lng: 7.03014,
            },
          },
        },
        arrival: {
          time: "2023-06-27T11:49:00+02:00",
          place: {
            name: "Leverkusen Manfort Bf",
            type: "station",
            location: {
              lat: 51.031612,
              lng: 7.015122,
            },
            id: "401506982",
          },
        },
        transport: {
          mode: "pedestrian",
        },
      },
      {
        id: "R0-S1",
        type: "transit",
        departure: {
          time: "2023-06-27T11:49:00+02:00",
          place: {
            name: "Leverkusen Manfort Bf",
            type: "station",
            location: {
              lat: 51.031612,
              lng: 7.015122,
            },
            id: "401506982",
          },
        },
        arrival: {
          time: "2023-06-27T11:56:00+02:00",
          place: {
            name: "Köln Bf Mülheim",
            type: "station",
            location: {
              lat: 50.957487,
              lng: 7.012405,
            },
            id: "401508915",
          },
        },
        transport: {
          mode: "regionalTrain",
          name: "RB48",
          category: "Rail",
          color: "#FFC82E",
          textColor: "#FFFFFF",
          headsign: "Köln Hbf",
          shortName: "RB48",
        },
        agency: {
          id: "25483_8d27ba3",
          name: "NX National Express Rail GmbH",
          website: "https://www.nationalexpress.de",
        },
      },
      {
        id: "R0-S2",
        type: "transit",
        departure: {
          time: "2023-06-27T12:01:00+02:00",
          place: {
            name: "Köln Bf Mülheim",
            type: "station",
            location: {
              lat: 50.957487,
              lng: 7.012405,
            },
            id: "401508915",
          },
          delay: 0,
        },
        arrival: {
          time: "2023-06-27T12:08:00+02:00",
          place: {
            name: "Köln Zoo/Flora",
            type: "station",
            location: {
              lat: 50.957376,
              lng: 6.97328,
            },
            id: "401506689",
          },
          delay: 0,
        },
        transport: {
          mode: "lightRail",
          name: "18",
          category: "Tram, Streetcar, Light rail",
          color: "#1D92D1",
          textColor: "#FFFFFF",
          headsign: "Bonn Hbf",
          shortName: "18",
        },
        agency: {
          id: "25483_6b86b27",
          name: "KVB Kölner Verkehrs-Betriebe AG",
          website: "https://www.kvb.koeln",
        },
      },
      {
        id: "R0-S3",
        type: "pedestrian",
        departure: {
          time: "2023-06-27T12:08:00+02:00",
          place: {
            name: "Köln Zoo/Flora",
            type: "station",
            location: {
              lat: 50.957376,
              lng: 6.97328,
            },
            id: "401506689",
          },
        },
        arrival: {
          time: "2023-06-27T12:13:00+02:00",
          place: {
            type: "place",
            location: {
              lat: 50.959229,
              lng: 6.97354,
            },
          },
        },
        transport: {
          mode: "pedestrian",
        },
      },
    ],
  },
]);
