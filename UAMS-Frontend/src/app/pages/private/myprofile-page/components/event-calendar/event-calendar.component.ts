import { Event } from './../../../../../models/event.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { EventService } from 'src/app/services/event/event.service';
//import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-event-calendar',
  templateUrl: './event-calendar.component.html',
  styleUrls: ['./event-calendar.component.scss']
})
export class EventCalendarComponent implements OnInit {
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  createModalIsActive:boolean = false;
  editModalIsActive:boolean = false;
  isLoading:boolean = false;
  selectedEvent:number = -1;
  newEvent:Event = new Event();
  allEvents:Event[] = [];

  events:Object[] = []

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    events: this.events,
    customButtons:{
      next:{
        click: this.handleNextMonthClick.bind(this)
      },
      prev:{
        click: this.handlePrevMonthClick.bind(this)
      },
      today:{
        text: "Today",
        click: this.handleTodayClick.bind(this)
      }
    }
  };

  constructor(private eventService:EventService) { }

  ngOnInit(): void {
    this.GetAllEvents(new Date().getMonth(), new Date().getFullYear());
  }

  GetAllEvents(month:number, year:number)
  {
    this.isLoading = true;
    this.eventService.GetByMonth(month+1, year).then((res) =>{
      this.allEvents = [];
      this.events = [];
      console.log(res);
      for(let i=0; i<res.length; i++)
      {
        console.log(res[i].start_time.split(' ')[0]);
        
        let newEvent:Event = Object.create(Event);
        newEvent.id = res[i].id;
        newEvent.user_id = res[i].user_id;
        newEvent.title = res[i].title;
        newEvent.description = res[i].description;

        newEvent.start_time = res[i].start_time;
        let startdate = newEvent.start_time.split(' ')[0];
        newEvent.start_time_year = startdate.split('-')[0];
        newEvent.start_time_month = startdate.split('-')[1];
        newEvent.start_time_day = startdate.split('-')[2];

        newEvent.end_time = res[i].end_time;
        let enddate = newEvent.start_time.split(' ')[0];
        newEvent.end_time_year = enddate.split('-')[0];
        newEvent.end_time_month = enddate.split('-')[1];
        newEvent.end_time_day = enddate.split('-')[2];
        
        this.allEvents.push(newEvent);
        this.events.push({event_id:newEvent.id, user_id:newEvent.user_id, title : newEvent.title, description: newEvent.description, start: newEvent.start_time, end: newEvent.end_time});
      }
      console.log(this.events);
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        dateClick: this.handleDateClick.bind(this),
        eventClick: this.handleEventClick.bind(this),
        events: this.events,
        customButtons:{
          next:{
            click: this.handleNextMonthClick.bind(this)
          },
          prev:{
            click: this.handlePrevMonthClick.bind(this)
          },
          today:{
            text: "Today",
            click: this.handleTodayClick.bind(this)
          }
        }
      };
      this.isLoading = false;
    }).catch((err) =>{
      this.isLoading = false;
      console.log(err);
    });
  }

  handleDateClick(arg: any) {
    //alert('date click! ' + arg.dateStr);
  }

  handleEventClick(arg: any) {
    this.selectedEvent = this.allEvents.findIndex(p => p.id == arg.event._def.extendedProps.event_id);
    this.newEvent = JSON.parse(JSON.stringify(this.allEvents[this.selectedEvent]));
    this.editModalIsActive = true;
  }

  handleNextMonthClick(arg:any)
  {
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.next();
    this.GetAllEvents(calendarApi.getDate().getMonth(), calendarApi.getDate().getFullYear());
  }

  handlePrevMonthClick(arg:any)
  {
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.prev();
    this.GetAllEvents(calendarApi.getDate().getMonth(), calendarApi.getDate().getFullYear());
  }

  handleTodayClick(arg:any)
  {
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.today();
    this.GetAllEvents(calendarApi.getDate().getMonth(), calendarApi.getDate().getFullYear());
  }

  OnEditTitle(event:any)
  {
    this.newEvent.title = event.target.value;
  }

  OnEditDescription(event:any)
  {
    this.newEvent.description = event.target.value;
  }

  OnEditStartDateMonth(event:any)
  {
    this.newEvent.start_time_month = event.target.value;
  }

  OnEditStartDateDay(event:any)
  {
    this.newEvent.start_time_day = event.target.value;
  }

  OnEditStartDateYear(event:any)
  {
    this.newEvent.start_time_year = event.target.value;
  }

  OnEditEndDateMonth(event:any)
  {
    this.newEvent.end_time_month = event.target.value;
  }

  OnEditEndDateDay(event:any)
  {
    this.newEvent.end_time_day = event.target.value;
  }

  OnEditEndDateYear(event:any)
  {
    this.newEvent.end_time_year = event.target.value;
  }

  OnClickAdd()
  {
    this.isLoading=true;
    let body = {
      title: this.newEvent.title,
      description: this.newEvent.description,
      start_time: this.newEvent.start_time_year+"-"+this.newEvent.start_time_month+"-"+this.newEvent.start_time_day+" 00:00:00",
      end_time: this.newEvent.end_time_year+"-"+this.newEvent.end_time_month+"-"+this.newEvent.end_time_day+" 00:00:00"
    }

    this.eventService.Create(body).then((res) =>{
      this.isLoading = false;
      console.log(res);
      this.OnClickClose();
      this.GetAllEvents(new Date().getMonth(), new Date().getFullYear());
    }).catch((err) =>{
      this.isLoading = false;
      window.alert(err.status + " " +err.statusText);
      console.log(err);
    });
  }

  OnClickUpdate()
  {
    this.isLoading=true;
    let body = {
      title: this.newEvent.title,
      description: this.newEvent.description,
      start_time: this.newEvent.start_time_year+"-"+this.newEvent.start_time_month+"-"+this.newEvent.start_time_day+" 00:00:00",
      end_time: this.newEvent.end_time_year+"-"+this.newEvent.end_time_month+"-"+this.newEvent.end_time_day+" 00:00:00"
    }

    this.eventService.Update(this.newEvent.id, body).then((res) =>{
      this.isLoading = false;
      console.log(res);
      this.OnClickClose();
      this.GetAllEvents(new Date().getMonth(), new Date().getFullYear());
    }).catch((err) =>{
      this.isLoading = false;
      window.alert(err.status + " " +err.statusText);
      console.log(err);
    });
  }

  OnClickDelete()
  {
    this.isLoading = true;
    this.eventService.Delete(this.newEvent.id).then((res) =>{
      console.log(res);
      this.OnClickClose();
      this.GetAllEvents(new Date().getMonth(), new Date().getFullYear());
    }).catch((err) =>{
      this.isLoading = false;
      window.alert(err.status + " " +err.statusText);
      console.log(err);
    });
  }

  OnClickClose()
  {
    this.editModalIsActive = false;
    this.createModalIsActive = false;
  }

  OnClickCreateEvent()
  {
    this.newEvent = new Event();
    this.createModalIsActive = true;
  }
}
