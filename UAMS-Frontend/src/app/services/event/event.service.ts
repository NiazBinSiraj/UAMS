import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appdata } from 'src/Appdata';

const baseUrl = Appdata.instance.backendURL;

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  private async request(method: string, url: string, data?: any) {
    let headers:HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept' : 'application/json',
      Authorization : 'Bearer ' + Appdata.instance.token
    });

    console.log('request ' + JSON.stringify(data));
    console.log(headers.keys());
    const result = this.http.request(method, url, {
      headers: headers,
      body: data,
      responseType: 'json',
      observe: 'body'
    });
    return new Promise<any>((resolve, reject) => {
      result.subscribe(resolve as any, reject as any);
    });
  }

  Create(body:any)
  {
    return this.request('post', `${baseUrl}/api/events`,body);
  }

  GetAll()
  {
    return this.request('get', `${baseUrl}/api/events`);
  }

  GetByMonth(month:number, year:number)
  {
    console.log(`${baseUrl}/api/events/?month=${month}&year=${year}`);
    return this.request('get', `${baseUrl}/api/events/?month=${month}&year=${year}`);
  }
  
  Get(event_id:any) {
    return this.request('get', `${baseUrl}/api/events/${event_id}`);
  }
  
  Update(event_id:any,body: any) {
    return this.request('put', `${baseUrl}/api/events/${event_id}`,body);
  }

  Delete(event_id:any){
    return this.request('delete', `${baseUrl}/api/events/${event_id}`);
  }
}
