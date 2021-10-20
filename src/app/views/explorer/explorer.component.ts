import { Component, OnInit } from '@angular/core';

import { ExplorerService } from 'src/app/shared/services/explorer.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent implements OnInit {

  allPlaces$?: Observable<any>

  constructor(
    private explorer: ExplorerService,
  ) { }

  ngOnInit(): void {
    this.allPlaces$ = this.explorer.allPlaces$;
  }

}
