import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}
  getWeather(city: string) {
    const URL = `${environment.URL}q=${city}&appid=${environment.appID}`;
    return this.http.get(URL);
  }

  getCurrentLocation() {
    return new Observable<GeolocationCoordinates>((observer) => {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position.coords);
          observer.complete();
        },
        (err) => observer.error(err)
      );
    }).pipe(
      map((value) => {
        return new HttpParams()
          .set('lat', value.latitude)
          .set('lon', value.longitude)
          .set('units', 'imperial')
          .set('appid', environment.appID);
      }),
        switchMap((value) => {
          return this.http.get('http://api.openweathermap.org/geo/1.0/reverse', {
            params: value,
          });
        })
    );
  }
  getForecast() {
    return new Observable<GeolocationCoordinates>((observer) => {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position.coords);
          observer.complete();
        },
        (err) => observer.error(err)
      );
    }).pipe(
      map((value) => {
        return new HttpParams()
          .set('lat', value.latitude)
          .set('lon', value.longitude)
          .set('units', 'imperial')
          .set('appid', environment.appID);
      }),
      switchMap((value) => {
        return this.http.get('http://api.openweathermap.org/data/2.5/forecast', {
          params: value,
        });
      })
    );
  }
}
