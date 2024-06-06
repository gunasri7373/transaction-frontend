import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'transaction-list' },
  {
    path: 'transaction-list',
    loadComponent: () =>
      import('./pages/transaction-list/transaction-list.component').then(
        (mod) => mod.TransactionListComponent
      ),
  },
  //   {
  //     path: 'transaction-detail',
  //     loadComponent: () =>
  //       import('./pages/transaction-details/transaction-details.component').then(
  //         (mod) => mod.TransactionDetailsComponent
  //       ),
  //   },
];
