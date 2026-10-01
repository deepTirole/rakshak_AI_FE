import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'intake',
    loadComponent: () => import('./intake.component').then((module) => module.IntakeComponent),
  },
  {
    path: 'mission-plan',
    loadComponent: () => import('./mission-plan.component').then((module) => module.MissionPlanComponent),
  },
  {
    path: 'about',
    loadComponent: () => import('./about.component').then((module) => module.AboutComponent),
  },
  { path: '', pathMatch: 'full', redirectTo: 'intake' },
  { path: '**', redirectTo: 'intake' },
];