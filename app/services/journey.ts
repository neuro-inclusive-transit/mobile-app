import { JourneyModel } from '~/models';

export class JourneyService {

  private journeys: JourneyModel[] = []

  static getInstance(): JourneyService {
    return JourneyService._instance;
  }

  private static _instance: JourneyService = new JourneyService();

  getJourneys(): JourneyModel[] {
    return this.journeys;
  }

  getJourney(id: number): JourneyModel | undefined {
    return this.journeys.find(journey => journey.id === id);
  }
}

