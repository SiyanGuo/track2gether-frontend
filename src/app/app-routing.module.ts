import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ExpensePageComponent } from './components/expense-page/expense-page.component';
import { IncomePageComponent } from './components/income-page/income-page.component';

const routes: Routes = [
  // {path: 'login', component: DashboardComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'expense', component: ExpensePageComponent},
  {path: 'income', component: IncomePageComponent },
  // will need to change to login
  {path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
