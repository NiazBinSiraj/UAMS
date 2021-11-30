import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginPageComponent } from './pages/public/login-page/login-page.component';
import { RegisterPageComponent } from './pages/public/register-page/register-page.component';
import { ForgetpasswordPageComponent } from './pages/public/forgetpassword-page/forgetpassword-page.component';
import { SharedModule } from './shared/shared.module';
import { ParadestatePageModule } from './pages/private/paradestate-page/paradestate-page.module';
import { AboutunitPageModule } from './pages/private/aboutunit-page/aboutunit-page.module';
import { DaakfilesPageModule } from './pages/private/daakfiles-page/daakfiles-page.module';
import { PoliciesPageModule } from './pages/private/policies-page/policies-page.module';
import { OfficesPageModule } from './pages/private/offices-page/offices-page.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    ForgetpasswordPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    ParadestatePageModule,
    AboutunitPageModule,
    DaakfilesPageModule,
    PoliciesPageModule,
    OfficesPageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
