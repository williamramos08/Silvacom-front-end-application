// data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  getCities(): Observable<any> {
    return this.http.get<any>('https://silvacom-backend-application.nn.r.appspot.com/cities');
  }

  getCity(city: string): Observable<any> {
    // Adjust the URL to include the selected city
    const url = `https://silvacom-backend-application.nn.r.appspot.com/city?id=${city}`;
    return this.http.get<any>(url);
  }

  getWeatherByCity(city: string): Observable<any> {
    // Adjust the URL to include the selected city
    const url = `https://silvacom-backend-application.nn.r.appspot.com/city/weather?id=${city}`;
    return this.http.get<any>(url);
  }

  getWeatherForecastByCityAndDays(city: string, days: number){
    const url = `https://silvacom-backend-application.nn.r.appspot.com/city/forecast?id=${city}&days=${days}`;
    console.log(url);
    return this.http.get<any>(url);
  }
}
