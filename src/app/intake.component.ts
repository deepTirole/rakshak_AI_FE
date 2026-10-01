import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, finalize } from 'rxjs';
import { HomeComponent } from './home.component';
import { ReadinessService } from './services/readiness.service';

@Component({
  selector: 'app-intake',
  imports: [CommonModule, HomeComponent, ReactiveFormsModule],
  templateUrl: './intake.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntakeComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly readinessService = inject(ReadinessService);
  private readonly router = inject(Router);

  readonly readinessForm = this.formBuilder.nonNullable.group({
    exam: ['Agniveer GD', [Validators.required]],
    age: [18, [Validators.required, Validators.min(16), Validators.max(35)]],
    heightCm: [170, [Validators.required, Validators.min(120)]],
    weightKg: [62, [Validators.required, Validators.min(35)]],
    runTime1600m: ['6:30', [Validators.required]],
    currentFitnessLevel: ['Intermediate', [Validators.required]],
    dailyStudyHours: [4, [Validators.required, Validators.min(1), Validators.max(16)]],
    targetMonths: [6, [Validators.required, Validators.min(1), Validators.max(24)]],
    notes: [''],
  });

  readonly isLoading$ = new BehaviorSubject<boolean>(false);
  readonly error$ = new BehaviorSubject<string | null>(null);

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
        next: (planResponse) => {
          this.readinessService.setPlan(planResponse);
          void this.router.navigateByUrl('/mission-plan');
        },
        error: () => this.error$.next('Could not generate readiness plan. Please retry in a moment.'),
      });
  }
}