import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NprService {


  constructor(
    private http: HttpClient,
  ) {}
  
  getParkData$() {
    return this.http.get('https://developer.nps.gov/api/v1/parks?limit=600&api_key=COpPZJCP6JqktIqYR5O3QIUbWJgQI8lh0HMyXRQJ');
  }
  
}
