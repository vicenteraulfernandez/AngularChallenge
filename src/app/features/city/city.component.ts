import { Component, DestroyRef, OnInit, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WeatherHttp } from '../services/weather.http';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-city',
  standalone: true,
  imports: [],
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css'],
})
export default class CityComponent implements OnInit {
  private weatherHttp = inject(WeatherHttp);
  private activedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  title: string;
  city: string;
  chart: any;

  constructor() {
    this.city = this.activedRoute.snapshot.paramMap.get('city')!;
    this.title = this.activedRoute.snapshot.paramMap.get('title')!;
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.weatherHttp
      .get(this.city)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          console.log(res);
          const periods: any[] = res.properties.periods;
          console.log(periods);

          const labels = periods.map((item) => item.name);
          const values = periods.map((item) => item.temperature);
          const temperatureUnit = periods.map((item) => item.temperatureUnit);

          this.chart = new Chart('canvas', {
            type: 'line',
            data: {
              labels: labels,
              datasets: [
                {
                  label: `Temperatures in ${temperatureUnit[0]}`,
                  data: values,
                  borderColor: 'rgb(75, 192, 192)',
                  tension: 0.1,
                },
              ],
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: `${this.title}`,
                },
              },
            },
          });
        },
        error: (error: HttpErrorResponse) => {
          console.error(error.message);
        },
        complete: () => {
          console.log('Done!');
        },
      });
  }
}
