import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoadingBarComponent } from './components/loading-bar/loading-bar.component';


@NgModule({
  declarations: [
    NavbarComponent,
    LoadingBarComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [
    NavbarComponent,
    LoadingBarComponent
  ]
})
export class SharedModule { }
