import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
//import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-event-calendar',
  templateUrl: './event-calendar.component.html',
  styleUrls: ['./event-calendar.component.scss']
})
export class EventCalendarComponent implements OnInit {
  
  events = [
    {title: "Event 1", date: "2021-10-01"},
    {title: "Event 2", date: "2021-10-10"}
  ]
  
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this),
    events: this.events
  };
  
  constructor() { }

  ngOnInit(): void {
  }

  handleDateClick(arg:any) {
    alert('date click! ' + arg.dateStr);
  }
}
