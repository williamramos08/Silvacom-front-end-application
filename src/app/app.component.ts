import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DataService } from './data.service';
import { DatePipe } from '@angular/common';

interface City {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'silvacom-frontend';
  cityData: any;
  weatherData : any;
  forecastData : any;
  maxDate =  new Date();
  daysValue = 0;
  cityValue = '';

  selectedValue: string | undefined;
  range: FormGroup;
  todayDate = new Date();
  formattedTodayDate: string;

  cities: City[] = [
    { value: 'New York', viewValue: 'New York, United States' },
    { value: 'London', viewValue: 'London, United Kingdom' },
    { value: 'Tokyo', viewValue: 'Tokyo, Japan' },
    { value: 'Paris', viewValue: 'Paris, France' },
    { value: 'Sydney', viewValue: 'Sydney, Australia' },
  ];

  constructor(private fb: FormBuilder, private dataService: DataService, private datePipe: DatePipe) {
    this.formattedTodayDate = this.datePipe.transform(this.todayDate, 'yyyy-MM-dd') || '';
    this.maxDate.setDate(this.maxDate.getDate() + 3);
    
    this.range = this.fb.group({
      city: [''],
      start: [this.todayDate],
      end: ['']
    });

    this.range.get('city')!.valueChanges.subscribe(cityValue => {
      if (cityValue) {
        this.cityValue = cityValue;
        this.getCityData(cityValue);
        this.getWeatherData(cityValue);
      }
    });

    this.range.get('end')?.valueChanges.subscribe((endDate: Date) => {
      if (endDate) {
        // Ensure the selected end date does not exceed the max date
        if (endDate > this.maxDate) {
          this.range.get('end')?.setValue(this.maxDate); // Set end date to max date if it exceeds it
        }
      }
    });

    this.range.valueChanges.subscribe(() => {
      // Calculate the number of days between the start and end dates
      const startDate = this.range.get('start')?.value;
      const endDate = this.range.get('end')?.value;
      if (startDate && endDate) {
        const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
        this.daysValue = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Calculate the difference in days
        this.getWeatherForecast(this.daysValue+1);
      }
    });
  }  

  ngOnInit() {
  }
  

  getCityData(cityValue: string) {
    this.dataService.getCity(cityValue).subscribe(
      (response) => {
        this.cityData = response;
      },
      (error) => {
        console.error('Error fetching city data:', error);
      }
    );
  }
 
  getWeatherData(cityValue: string) {
    this.dataService.getWeatherByCity(cityValue).subscribe(
      (response) => {
        this.weatherData = response;
      },
      (error) => {
        console.error('Error fetching city data:', error);
      }
    );
  }

  getWeatherForecast(daysValue: number) {
    console.log(this.cityValue+" + "+this.daysValue);
    this.dataService.getWeatherForecastByCityAndDays(this.cityValue, daysValue).subscribe(
      (response) => {
        this.forecastData = response;
      },
      (error) => {
        console.error('Error fetching city data:', error);
      }
    );
  }
}
