import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../core/environments/environment';

@Injectable({ providedIn: 'root' })
export class WeatherHttp {
  private endPoint = environment.forecast.api;
  private http = inject(HttpClient);

  get(city: string): Observable<any> {
    return this.http.get<any>(`${this.endPoint}/${city}/31,80/forecast`);
  }
}
