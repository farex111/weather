import { Component, OnInit } from '@angular/core';
import { pluck } from 'rxjs';
import { WeatherService } from '../getWeather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
})
export class ForecastComponent implements OnInit {
  today = new Date();
  timeline: any[] = [];
  dateNow: any;
  weatherNow: any = [];
  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.weatherService
      .getForecast()
      .pipe(pluck('list'))
      .subscribe((data) => {
        this.getToday(data);
      });
  }
  getToday(today: any) {
    for (let i = 0; i < today.length; i = i + 8) {
      this.weatherNow.push(today[i]);
      console.log(this.weatherNow);
    }

    for (const iterator of today.slice(0, 5)) {
      this.timeline.push({
        time: iterator.dt_txt,
        temp: iterator.main.temp,
        description: iterator.weather[0].description,
        icon: iterator.weather[0].icon,
      });

      const apiDate = new Date(iterator.dt_txt).getTime();
      if (
        this.dateRange().start.getTime() <= apiDate &&
        this.dateRange().to.getTime() >= apiDate
      ) {
        this.dateNow = iterator;
      }
    }
  }
  dateRange() {
    const start = new Date();
    start.setHours(start.getHours() + start.getTimezoneOffset() / 60);
    const to = new Date(start);
    to.setHours(to.getHours() + 2, to.getMinutes() + 59, to.getSeconds() + 59);

    return { start, to };
  }
}
