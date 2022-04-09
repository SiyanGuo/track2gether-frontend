import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ExpensePageComponent } from './components/expense-page/expense-page.component';
import { IncomePageComponent } from './components/income-page/income-page.component';
import { LoginComponent } from './components/login/login.component';
import { PartnerPageComponent } from './components/partner-page/partner-page.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'expenses', component: ExpensePageComponent},
  {path: 'income', component: IncomePageComponent },
  {path: 'partner', component: PartnerPageComponent },
  {path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
