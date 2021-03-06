import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IncomePageComponent } from './components/income-page/income-page.component';
import { ExpensePageComponent } from './components/expense-page/expense-page.component';
import { FormComponent } from './components/form/form.component';
import { AppRoutingModule } from './app-routing.module';
import { PartnerPageComponent } from './components/partner-page/partner-page.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { RecordListComponent } from './components/record-list/record-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { HomeComponent } from './components/home/home.component';
import { InterceptorService } from './_helpers/auth.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    DashboardComponent,
    IncomePageComponent,
    ExpensePageComponent,
    FormComponent,
    PartnerPageComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    RecordListComponent,
    DeleteModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
