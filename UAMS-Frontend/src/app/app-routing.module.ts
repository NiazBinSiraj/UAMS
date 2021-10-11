import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPageComponent } from './pages/public/login-page/login-page.component';
import { RegisterPageComponent } from './pages/public/register-page/register-page.component';
import { ForgetpasswordPageComponent } from './pages/public/forgetpassword-page/forgetpassword-page.component';

const routes: Routes = [
  {path: "login", component: LoginPageComponent},
  {path: "register", component: RegisterPageComponent},
  {path: "forgetpassword", component: ForgetpasswordPageComponent},
  {path: '', redirectTo: "/login", pathMatch: 'full'},
  { path: 'home', loadChildren: () => import('./pages/private/home-page/home-page.module').then(m => m.HomePageModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
