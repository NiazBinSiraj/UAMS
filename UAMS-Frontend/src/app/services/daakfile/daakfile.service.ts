import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appdata } from 'src/Appdata';

const baseUrl = Appdata.instance.backendURL;

@Injectable({
  providedIn: 'root'
})
export class DaakfileService {
  constructor(private http: HttpClient) { }

  private async request(method: string, url: string, data?: any) {
    let headers:HttpHeaders = new HttpHeaders({
      //'Content-Type': 'multipart/form-data',
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

  private async requestJSON(method: string, url: string, data?: any) {
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

  Create(body:any){
    let formData = new FormData();
    formData.append("name", body.name);
    formData.append("file", body.file);
    formData.append("upload_date", body.upload_date);
    formData.append("message", body.message);
    formData.append("owner", body.owner);

    return this.request('post', `${baseUrl}/api/daakfiles`, formData);
  }

  Get(owner:string|null, year:string|null, month:string|null){
    return this.request('get', `${baseUrl}/api/daakfiles?&owner=${owner}&year=${year}&month=${month}`);
  }

  GetAll(year:string|null, month:string|null){
    return this.request('get', `${baseUrl}/api/daakfiles?year=${year}&month=${month}`);
  }

  Delete(id:number){
    return this.request('delete', `${baseUrl}/api/daakfiles/${id}`);
  }

  Update(id:any, body:any){
    return this.requestJSON('patch', `${baseUrl}/api/daakfiles/${id}`, body);
  }
  
}
