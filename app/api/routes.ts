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

type RouteApiGetParams = {
  origin: {
    lat: number;
    lng: number;
  },
  destination: {
    lat: number;
    lng: number;
  },
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

export const routeApi = {
  get: async (params: RouteApiGetParams) => {
    const routeOptions: GetRouteOptions = {
      ...params,
      origin: `${params.origin.lat},${params.origin.lng}`,
      destination: `${params.destination.lat},${params.destination.lng}`,
      arrivalTime: params.arrivalTime?.toISOString() || undefined,
      departureTime: params.departureTime?.toISOString() || undefined,
    };

    const response = await Http.request({
      url: process.env.BACKEND_SERVICE_ROUTE_URL ?? '',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...routeOptions
      },
    })

    console.log('routeOptions', routeOptions)

    if (response.statusCode !== 200) {
      throw new Error(response.content?.toString())
    }

    return JSON.parse(response.content?.toString() || '{}')
  }
}
