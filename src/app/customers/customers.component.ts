import { Component, OnInit } from '@angular/core';
import { map, share, Subscription, timer } from 'rxjs';
import { WeatherService } from '../getWeather.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  current: any;
  today = new Date();
  sunRiseDate: any;
  realClockSubscription: Subscription = new Subscription();
  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.realClockSubscription = timer(0, 1000)
      .pipe(
        map(() => new Date()),
        share()
      )
      .subscribe((time) => {
        this.today = time;
      });
    this.weatherService.getCurrentLocation().subscribe((data) => {
      this.getCity(data);
    });
  }
  ngOnDestroy(): void {
    if (this.realClockSubscription) {
      this.realClockSubscription.unsubscribe();
    }
  }
  getCity(today: any) {
    this.weatherService.getWeather(today[0].name).subscribe((data) => {
      this.getCityCurrentWeather(data);
    });
  }

  getCityCurrentWeather(today: any) {
    this.current = today;
    this.sunRiseDate = new Date(today.sys.sunrise * 1000);
  }
}
