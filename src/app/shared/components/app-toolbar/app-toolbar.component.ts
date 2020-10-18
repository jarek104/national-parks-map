import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sp-app-toolbar',
  templateUrl: './app-toolbar.component.html',
  styleUrls: ['./app-toolbar.component.scss']
})
export class AppToolbarComponent implements OnInit {

  @Output() emitSidenavToggle = new EventEmitter;
  showSearchInput = false;

  constructor() { }

  ngOnInit() {
  }

  onMenuClick() {
    this.emitSidenavToggle.emit();
  }
}
