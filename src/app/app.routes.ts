import { Routes } from '@angular/router';

const loadHome = () => import('./features/home/home').then((component) => component.Home);

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'projects',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: loadHome,
  },
  {
    path: 'dashboard',
    loadComponent: loadHome,
  },
  {
    path: 'my-workspace',
    loadComponent: loadHome,
  },
  {
    path: 'subportfolios',
    loadComponent: loadHome,
  },
  {
    path: 'programs',
    loadComponent: loadHome,
  },
  {
    path: 'projects',
    loadComponent: loadHome,
  },
  {
    path: 'orders',
    loadComponent: loadHome,
  },
  {
    path: 'ideas',
    loadComponent: loadHome,
  },
  {
    path: 'approvals',
    loadComponent: loadHome,
  },
  {
    path: 'settings',
    loadComponent: loadHome,
  },
  {
    path: 'lessons-learned',
    loadComponent: loadHome,
  },
  {
    path: 'help',
    loadComponent: loadHome,
  },
  {
    path: 'pl-checklist',
    loadComponent: loadHome,
  },
  {
    path: '**',
    redirectTo: 'projects',
  },
];
