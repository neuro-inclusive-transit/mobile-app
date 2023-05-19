import { PlaceModel } from "~/models";

export class PlaceService {

  private places: PlaceModel[] = [
    {
      id: 0,
      icon: "🏠",
      name: "Home",
      location: {
        lat: 51.505,
        lng: -0.09
      },
      address: {
        street: "Baker Street",
        postcode: "NW1 6XE",
        city: "London",
        country: "United Kingdom"
      },
      currentLocation: false,
    },
    {
      id: 1,
      icon: "🏢",
      name: "Work",
      location: {
        lat: 51.515,
        lng: -0.072
      },
      address: {
        street: "Old Street",
        postcode: "EC1V 9BP",
        city: "London",
        country: "United Kingdom"
      },
      currentLocation: false,
    },
  ]

  static getInstance(): PlaceService {
    return PlaceService._instance;
  }

  private static _instance: PlaceService = new PlaceService();

  getPlaces(): PlaceModel[] {
    return this.places;
  }

  getPlace(id: number): PlaceModel | undefined {
    return this.places.find(place => place.id === id);
  }
}
