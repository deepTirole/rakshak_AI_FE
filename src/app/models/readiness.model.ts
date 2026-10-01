export interface AspirantRequest {
  exam: string;
  age: number;
  heightCm: number;
  weightKg: number;
  currentFitnessLevel: string;
  dailyStudyHours: number;
  targetMonths: number;
  notes?: string;
  runTime1600m: string;
}

export type PlanSection = string | string[];

export interface PlanResponse {
  eligibilityStatus: PlanSection;
  ruralDietPlan: PlanSection;
  weightTarget: PlanSection;
  weeklyWorkoutRoutine: PlanSection;
  studySchedule: PlanSection;
}
