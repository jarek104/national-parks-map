import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { ExplorerService } from '../../services/explorer.service';

@Component({
  selector: 'sp-app-toolbar',
  templateUrl: './app-toolbar.component.html',
  styleUrls: ['./app-toolbar.component.scss']
})
export class AppToolbarComponent implements OnInit {

  @Output() emitSidenavToggle = new EventEmitter;
  showSearchInput = false;
  
  constructor(private explorationService: ExplorerService) { }

  ngOnInit() {
  }

  onMenuClick() {
    this.emitSidenavToggle.emit();
  }
}
