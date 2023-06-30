import { Http } from '@nativescript/core';

type GetRouteOptions = {
  origin: string;
  destination: string;
  arrivalTime?: string;
  departureTime?: string;
  lang?: string;
  units?: string;
  changes?: number;
  alternatives?: number;
  modes?: string;
  pedestrianSpeed?: number;
  return?: string;
};

type LatLng = {
  lat: number;
  lng: number;
};

type Place = {
  id?: string;
  name?: string;
  type: string;
  location: LatLng;
};

type TimeAndPlace = {
  time: string;
  place: Place;
  delay?: number;
};

type RouteApiGetParams = {
  origin: LatLng,
  destination: LatLng,
  arrivalTime?: Date;
  departureTime?: Date;
  lang?: string;
  units?: string;
  changes?: number;
  alternatives?: number;
  modes?: string;
  pedestrianSpeed?: number;
  return?: string;
};

export type HereApiRoute = {
  id: string;
  sections: Array<{
    id: string;
    type: string;
    departure: TimeAndPlace;
    arrival: TimeAndPlace;
    summary?: {
      duration: number;
      length: number;
    }
    actions?: Array<{
      action: string;
      duration: number;
      instruction: string;
      offset: number;
    }>;
    polyline?: string;
    spans?: Array<{
      offset: number;
      names: Array<{
        value: string;
        language: string;
      }>;
    }>;
    transport: {
      mode: string;
      name?: string;
      category?: string;
      color?: string;
      textColor?: string;
      headsign?: string;
      shortName?: string;
    }
    agency?: {
      id: string;
      name: string;
      website: string;
    };
  }>;
  agency?: {
    id: string;
    name: string;
    website: string;
  };
}

export type RouteApiGetResponse = {
  routes: Array<HereApiRoute>;
};


export const routeApi = {
  get: async (params: RouteApiGetParams) => {
    const routeOptions: GetRouteOptions = {
      ...params,
      origin: `${params.origin.lat},${params.origin.lng}`,
      destination: `${params.destination.lat},${params.destination.lng}`,
      arrivalTime: params.arrivalTime?.toISOString() ?? undefined,
      departureTime: params.departureTime?.toISOString() ?? undefined,
    };

    Object.keys(routeOptions).forEach(key => {
      if (routeOptions[key as keyof typeof routeOptions] === undefined) {
        delete routeOptions[key as keyof typeof routeOptions];
      }
    });

    const response = await Http.request({
      url: process.env.BACKEND_SERVICE_ROUTE_URL ?? '',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...routeOptions
      },
    });

    if (response.statusCode !== 200 || !response.content) {
      throw new Error(response.content?.toString())
    }

    const responseJson = JSON.parse(response.content.toString()) as RouteApiGetResponse;

    return responseJson.routes;
  }
}
