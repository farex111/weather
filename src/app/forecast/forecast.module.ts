import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForecastComponent } from './forecast.component';
import { ForecastRoutingModule } from './forecast-routing.module';

@NgModule({
  declarations: [
    ForecastComponent,
  ],
  imports: [
    CommonModule,
    ForecastRoutingModule
  ]
})
export class ForecastModule { }
