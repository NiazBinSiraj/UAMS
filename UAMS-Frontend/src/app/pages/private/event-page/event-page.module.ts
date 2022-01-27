import { MyprofilePageModule } from './../myprofile-page/myprofile-page.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventPageRoutingModule } from './event-page-routing.module';
import { EventPageComponent } from './event-page.component';
import { FullCalendarModule } from '@fullcalendar/angular';


@NgModule({
  declarations: [
    EventPageComponent
  ],
  imports: [
    CommonModule,
    EventPageRoutingModule,
    FullCalendarModule,
    MyprofilePageModule
  ]
})
export class EventPageModule { }
