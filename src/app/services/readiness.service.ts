import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AspirantRequest, PlanResponse } from '../models/readiness.model';

@Injectable({
  providedIn: 'root',
})
export class ReadinessService {
  private readonly readinessEndpoint = 'http://localhost:8080/api/v1/readiness/generate';
  readonly planResponse$ = new BehaviorSubject<PlanResponse | null>(null);

  constructor(private readonly http: HttpClient) {}

  generatePlan(payload: AspirantRequest): Observable<PlanResponse> {
    return this.http.post<PlanResponse>(this.readinessEndpoint, payload);
  }

  setPlan(planResponse: PlanResponse): void {
    this.planResponse$.next(planResponse);
  }

  clearPlan(): void {
    this.planResponse$.next(null);
  }
}
