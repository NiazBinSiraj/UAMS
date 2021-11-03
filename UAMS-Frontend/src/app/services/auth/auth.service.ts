import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Appdata } from 'src/Appdata';

const baseUrl = Appdata.instance.backendURL;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private async request(method: string, url: string, data?: any) {
    let headers:HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    console.log('request ' + JSON.stringify(data));
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

  private async requestWithAuthorization(method: string, url: string, data?: any) {
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

  Login(body: { email: string; password: string }) {
    return this.request('post', `${baseUrl}/api/login`,body);
  }

  Register(body: any) {
    return this.request('post', `${baseUrl}/api/register`,body);
  }

  Logout()
  {
    return this.requestWithAuthorization('post', `${baseUrl}/api/logout`);
  }
}
