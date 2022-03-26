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
  { path: 'home', loadChildren: () => import('./pages/private/home-page/home-page.module').then(m => m.HomePageModule) },
  { path: 'about', loadChildren: () => import('./pages/private/aboutunit-page/aboutunit-page.module').then(m => m.AboutunitPageModule) },
  { path: 'myprofile', loadChildren: () => import('./pages/private/myprofile-page/myprofile-page.module').then(m => m.MyprofilePageModule) },
  { path: 'paradestate', loadChildren: () => import('./pages/private/paradestate-page/paradestate-page.module').then(m => m.ParadestatePageModule) },
  { path: 'offices', loadChildren: () => import('./pages/private/offices-page/offices-page.module').then(m => m.OfficesPageModule) },
  { path: 'Policy', loadChildren: () => import('./pages/private/policies-page/policies-page.module').then(m => m.PoliciesPageModule) },
  { path: 'events', loadChildren: () => import('./pages/private/event-page/event-page.module').then(m => m.EventPageModule) },
  { path: 'daakfiles', loadChildren: () => import('./pages/private/daakfiles-page/daakfiles-page.module').then(m => m.DaakfilesPageModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
