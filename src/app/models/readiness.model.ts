export interface AspirantRequest {
  exam: string;
  age: number;
  heightCm: number;
  weightKg: number;
  currentFitnessLevel: string;
  dailyStudyHours: number;
  targetMonths: number;
  notes?: string;
}

export type PlanSection = string | string[];

export interface PlanResponse {
  eligibilityBiometrics: PlanSection;
  desiNutrition: PlanSection;
  dualPillarSchedule: PlanSection;
}
