import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject, finalize } from 'rxjs';
import { HomeComponent } from './home.component';
import { PlanSection, PlanResponse } from './models/readiness.model';
import { ReadinessService } from './services/readiness.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, ReactiveFormsModule, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.scss',
})
export class AppComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly readinessService = inject(ReadinessService);

  readonly readinessForm = this.formBuilder.nonNullable.group({
    exam: ['Agniveer GD', [Validators.required]],
    age: [18, [Validators.required, Validators.min(16), Validators.max(35)]],
    heightCm: [170, [Validators.required, Validators.min(120)]],
    weightKg: [62, [Validators.required, Validators.min(35)]],
    currentFitnessLevel: ['Intermediate', [Validators.required]],
    dailyStudyHours: [4, [Validators.required, Validators.min(1), Validators.max(16)]],
    targetMonths: [6, [Validators.required, Validators.min(1), Validators.max(24)]],
    notes: [''],
  });

  readonly isLoading$ = new BehaviorSubject<boolean>(false);
  readonly error$ = new BehaviorSubject<string | null>(null);
  readonly planResponse$ = new BehaviorSubject<PlanResponse | null>(null);

  submitReadinessPlan(): void {
    if (this.readinessForm.invalid) {
      this.readinessForm.markAllAsTouched();
      return;
    }

    this.error$.next(null);
    this.isLoading$.next(true);

    this.readinessService
      .generatePlan(this.readinessForm.getRawValue())
      .pipe(finalize(() => this.isLoading$.next(false)))
      .subscribe({
        next: (planResponse) => this.planResponse$.next(planResponse),
        error: () => {
          this.planResponse$.next(null);
          this.error$.next('Could not generate readiness plan. Please retry in a moment.');
        },
      });
  }

  sectionToList(section: PlanSection | undefined): string[] {
    if (!section) {
      return ['Awaiting AI plan details.'];
    }

    if (Array.isArray(section)) {
      return section;
    }

    return section
      .split(/\n+/)
      .map((entry) => entry.trim())
      .filter(Boolean);
  }
}
