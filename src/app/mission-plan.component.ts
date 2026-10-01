import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReadinessService } from './services/readiness.service';

@Component({
  selector: 'app-mission-plan',
  imports: [AsyncPipe, CommonModule],
  templateUrl: './mission-plan.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MissionPlanComponent implements OnInit {
  private readonly readinessService = inject(ReadinessService);
  private readonly router = inject(Router);

  readonly planResponse$ = this.readinessService.planResponse$;

  ngOnInit(): void {
    if (!this.readinessService.planResponse$.value) {
      void this.router.navigateByUrl('/intake', { replaceUrl: true });
    }
  }

  startOver(): void {
    this.readinessService.clearPlan();
    void this.router.navigateByUrl('/intake');
  }
}