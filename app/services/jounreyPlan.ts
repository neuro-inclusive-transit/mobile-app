import { JourneyPlanModel } from "~/models/journeyPlan";

export class JourneyPlanService {

  private journeyPlan: JourneyPlanModel | null = null;

  static getInstance(): JourneyPlanService {
    return JourneyPlanService._instance;
  }

  private static _instance: JourneyPlanService = new JourneyPlanService();

  getJourneyPlan(): JourneyPlanModel | null {
    return this.journeyPlan;
  }
}
