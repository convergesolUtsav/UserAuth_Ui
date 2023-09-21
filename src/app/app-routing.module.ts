import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './account/sign-in/sign-in.component';
import { RegistrationComponent } from './account/registration/registration.component';
import { ForgetPasswordComponent } from './account/account/forget-password/forget-password.component';
import { ChangePasswordComponent } from './account/account/change-password/change-password.component';
import { ResetPasswordComponent } from './account/account/reset-password/reset-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path: '', component: SignInComponent},
  {path: 'sign-In', component: SignInComponent},
  {path: 'Create-Account', component: RegistrationComponent},
  {path: 'forgetPassword', component: ForgetPasswordComponent},
  {path : 'changePassword', component : ChangePasswordComponent},
  {path : 'resetPassword', component : ResetPasswordComponent},
  {path : 'dashboard', component : DashboardComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
