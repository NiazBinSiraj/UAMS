import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!

import { MyprofilePageRoutingModule } from './myprofile-page-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { MyprofilePageComponent } from './myprofile-page.component';
import { EventCalendarComponent } from './components/event-calendar/event-calendar.component';
import { TodolistComponent } from './components/todolist/todolist.component';


FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    MyprofilePageComponent,
    EventCalendarComponent,
    TodolistComponent
  ],
  imports: [
    CommonModule,
    FullCalendarModule,
    MyprofilePageRoutingModule,
    SharedModule
  ]
})
export class MyprofilePageModule { }
