// data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>('http://api.weatherapi.com/v1/current.json?q=London&key=d40df45c2fc94d38b58232014243003');
  }

  getCities(): Observable<any> {
    return this.http.get<any>('/api/cities');
  }
}
