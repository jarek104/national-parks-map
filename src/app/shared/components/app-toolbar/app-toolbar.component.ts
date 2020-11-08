import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { ExplorationMode } from 'src/app/models/exploration-mode';
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
  mode$?: Observable<string> = this.explorationService.explorationMode$;

  constructor(private explorationService: ExplorerService) { }

  ngOnInit() {
  }

  onMenuClick() {
    this.emitSidenavToggle.emit();
  }

  onModeChange(change: MatButtonToggleChange) {    
    this.explorationService.explorationMode$.next(change.value)
  }
}
