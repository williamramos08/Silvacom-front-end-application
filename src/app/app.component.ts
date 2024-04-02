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
  data: any;

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
    
    this.range = this.fb.group({
      city: [''],
      start: [this.todayDate],
      end: ['']
    });
  }  

  ngOnInit() {
    this.dataService.getData().subscribe(
      (response) => {
        this.data = response;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  filterFn = (date: Date | null): boolean => {
    // Allow selection of today's date or future dates
    return !date || date >= this.todayDate;
  }
  
 
}
