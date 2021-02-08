import { Component, OnInit } from '@angular/core';
import { map, startWith } from 'rxjs/operators';

import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { STATES_WITH_COORDINATES } from './../../../assets/states';

export interface US_State {
  state: string;
  latitude: number;
  longitude: number;
}

@Component({
  selector: 'sp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  states = STATES_WITH_COORDINATES;
  stateControl = new FormControl();
  filteredStates: Observable<US_State[]>;

  ngOnInit(): void {
    this.filteredStates = this.stateControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  constructor(private router: Router) {}

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
    });
  }

  onStateSelected(option: MatAutocompleteSelectedEvent) {
    console.log(option.option.value)
    this.router.navigate(['explorer']);
  }

  private _filter(value: string): any[] {
    console.log('filter', value);

    const filterValue = value.toLowerCase();
    return this.states.filter(state => state.state.toLowerCase().indexOf(filterValue) > -1);
  }

  test() {
    console.log('hi');

    this.getPosition().then(pos => {
         console.log(`Positon: ${pos.lng} ${pos.lat}`);
    });
  }
  getOptionText(value: US_State) {
    if (value) {
      return value.state
    }
  }

}
