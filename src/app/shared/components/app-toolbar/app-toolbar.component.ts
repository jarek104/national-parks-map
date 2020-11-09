import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { ExplorationMode } from 'src/app/models/exploration';
import { ExplorerService } from '../../services/explorer.service';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Observable } from 'rxjs';

@Component({
  selector: 'sp-app-toolbar',
  templateUrl: './app-toolbar.component.html',
  styleUrls: ['./app-toolbar.component.scss']
})
export class AppToolbarComponent implements OnInit {

  @Output() emitSidenavToggle = new EventEmitter;
  showSearchInput = false;
  mode$?: Observable<ExplorationMode> = this.explorationService.explorationMode$;

  constructor(private explorationService: ExplorerService) { }

  ngOnInit() {
  }

  onMenuClick() {
    this.emitSidenavToggle.emit();
  }

  onModeChange(change: MatButtonToggleChange) {  
    console.log('change.value', change.value);
      
    this.explorationService.explorationMode$.next(change.value)
  }
}
