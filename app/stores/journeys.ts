import { dbStore } from "~/stores/misc/dbStore";
import { Minutes } from "~/stores/misc/types";
import { Place } from "~/stores/places";
import { CompanionMode, JourneyPlanMode } from "~/types";
import { HereApiRoute } from "~/api/routes";

export interface Journey {
  departure: Place;
  arrival: Place;
  reminderBefore: Minutes;
  companionMode: CompanionMode;
  sections: HereApiRoute["sections"];
}

export const journeys = dbStore<Journey>("journey"/*, [
  {
    time: {
      type: JourneyPlanMode.Departure,
      value: new Date("2023-07-05T09:00:28.519Z"),
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
          actions: [
            {
              action: "depart",
              duration: 84,
              instruction: "Gehen Sie auf Finkelsteinstraße nach Westen. Gehen Sie 79 m."
            },
            {
              action: "turn",
              duration: 71,
              instruction: "Biegen Sie links ab auf die Finkelsteinstraße. Gehen Sie 59 m.",
              direction: "left",
              severity: "quite"
            },
            {
              action: "turn",
              duration: 241,
              instruction: "Biegen Sie rechts ab auf die Virchowstraße. Gehen Sie 240 m.",
              direction: "right",
              severity: "quite"
            },
            {
              action: "continue",
              duration: 7,
              instruction: "Gehen Sie geradeaus weiter. Gehen Sie 7 m."
            },
            {
              action: "turn",
              duration: 190,
              instruction: "Biegen Sie links ab. Gehen Sie 185 m.",
              direction: "left",
              severity: "quite"
            },
            {
              action: "turn",
              duration: 694,
              instruction: "Biegen Sie links ab auf die Gustav-Heinemann-Straße. Gehen Sie 684 m.",
              direction: "left",
              severity: "quite"
            },
            {
              action: "turn",
              duration: 139,
              instruction: "Biegen Sie links ab auf die Poststraße. Gehen Sie 133 m.",
              direction: "left",
              severity: "quite"
            },
            {
              action: "roundaboutExit",
              duration: 48,
              instruction: "Gehen Sie links um den Kreisverkehr und biegen Sie ab an der ersten Straße, Moosweg. Gehen Sie 41 m.",
              exit: 1,
              direction: "right"
            },
            {
              action: "turn",
              duration: 56,
              instruction: "Biegen Sie rechts ab. Gehen Sie 56 m.",
              direction: "right",
              severity: "quite"
            },
            {
              action: "arrive",
              duration: 0,
              instruction: "Sie erreichen Ihr Ziel auf der linken Seite."
            }
          ],
          departure: {
            time: "2023-07-05T11:24:00+02:00",
            place: {
              type: "place",
              location: {
                lat: 51.03133,
                lng: 7.03014
              }
            }
          },
          arrival: {
            time: "2023-07-05T11:49:00+02:00",
            place: {
              name: "Leverkusen Manfort Bf",
              type: "station",
              location: {
                lat: 51.031612,
                lng: 7.015122
              },
              id: "401506982"
            }
          },
          transport: {
            mode: "pedestrian"
          }
        },
        {
          id: "R0-S1",
          type: "transit",
          departure: {
            time: "2023-07-05T11:49:00+02:00",
            place: {
              name: "Leverkusen Manfort Bf",
              type: "station",
              location: {
                lat: 51.031612,
                lng: 7.015122
              },
              id: "401506982"
            }
          },
          arrival: {
            time: "2023-07-05T11:56:00+02:00",
            place: {
              name: "Köln Bf Mülheim",
              type: "station",
              location: {
                lat: 50.957487,
                lng: 7.012405
              },
              id: "401508915"
            }
          },
          transport: {
            mode: "regionalTrain",
            name: "RB48",
            category: "Rail",
            color: "#FFC82E",
            textColor: "#FFFFFF",
            headsign: "Köln Hbf",
            shortName: "RB48"
          },
          intermediateStops: [],
          agency: {
            id: "25483_8d27ba3",
            name: "NX National Express Rail GmbH",
            website: "https://www.nationalexpress.de"
          }
        },
        {
          id: "R0-S2",
          type: "transit",
          departure: {
            time: "2023-07-05T12:01:00+02:00",
            place: {
              name: "Köln Bf Mülheim",
              type: "station",
              location: {
                lat: 50.957487,
                lng: 7.012405
              },
              id: "401508915"
            }
          },
          arrival: {
            time: "2023-07-05T12:08:00+02:00",
            place: {
              name: "Köln Zoo/Flora",
              type: "station",
              location: {
                lat: 50.957376,
                lng: 6.97328
              },
              id: "401506689"
            }
          },
          transport: {
            mode: "lightRail",
            name: "18",
            category: "Tram, Streetcar, Light rail",
            color: "#1D92D1",
            textColor: "#FFFFFF",
            headsign: "Bonn Hbf",
            shortName: "18"
          },
          intermediateStops: [
            {
              departure: {
                time: "2023-07-05T12:04:00+02:00",
                place: {
                  name: "Köln Mülheim Wiener Platz",
                  type: "station",
                  location: {
                    lat: 50.961797,
                    lng: 7.004204
                  },
                  id: "401506751"
                }
              },
              duration: 60
            },
            {
              departure: {
                time: "2023-07-05T12:06:00+02:00",
                place: {
                  name: "Köln Slabystr.",
                  type: "station",
                  location: {
                    lat: 50.966582,
                    lng: 6.988121
                  },
                  id: "401506691"
                }
              }
            },
            {
              departure: {
                time: "2023-07-05T12:07:00+02:00",
                place: {
                  name: "Köln Boltensternstr.",
                  type: "station",
                  location: {
                    lat: 50.96239,
                    lng: 6.980944
                  },
                  id: "401506690"
                }
              }
            }
          ],
          agency: {
            id: "25483_6b86b27",
            name: "KVB Kölner Verkehrs-Betriebe AG",
            website: "https://www.kvb.koeln"
          }
        },
        {
          id: "R0-S3",
          type: "pedestrian",
          actions: [
            {
              action: "depart",
              duration: 156,
              instruction: "Gehen Sie auf Lennéplatz nach Südwesten. Gehen Sie 155 m."
            },
            {
              action: "turn",
              duration: 35,
              instruction: "Biegen Sie rechts ab. Gehen Sie 35 m.",
              direction: "right",
              severity: "quite"
            },
            {
              action: "turn",
              duration: 107,
              instruction: "Biegen Sie links ab. Gehen Sie 107 m.",
              direction: "left",
              severity: "quite"
            },
            {
              action: "arrive",
              duration: 0,
              instruction: "Sie erreichen Ihr Ziel auf der linken Seite."
            }
          ],
          departure: {
            time: "2023-07-05T12:08:00+02:00",
            place: {
              name: "Köln Zoo/Flora",
              type: "station",
              location: {
                lat: 50.957376,
                lng: 6.97328
              },
              id: "401506689"
            }
          },
          arrival: {
            time: "2023-07-05T12:13:00+02:00",
            place: {
              type: "place",
              location: {
                lat: 50.959229,
                lng: 6.97354
              }
            }
          },
          transport: {
            mode: "pedestrian"
          }
        }
      ]
  },
]*/);
