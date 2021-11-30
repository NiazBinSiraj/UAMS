import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DaakfilesPageRoutingModule } from './daakfiles-page-routing.module';
import { DaakfilesPageComponent } from './daakfiles-page.component';


@NgModule({
  declarations: [
    DaakfilesPageComponent
  ],
  imports: [
    CommonModule,
    DaakfilesPageRoutingModule
  ]
})
export class DaakfilesPageModule { }
