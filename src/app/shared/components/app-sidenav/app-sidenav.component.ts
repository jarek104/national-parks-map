import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NavLink } from 'src/app/models/nav-link';

@Component({
  selector: 'sp-app-sidenav',
  templateUrl: './app-sidenav.component.html',
  styleUrls: ['./app-sidenav.component.scss']
})
export class AppSidenavComponent implements OnInit {

  @Output() linkClicked = new EventEmitter();
  @Output() emitSidenavToggle = new EventEmitter;

  links: NavLink[] = [
    {
      route: 'profile',
      label: 'Profile'
    },
    {
      route: 'uploads',
      label: 'Uploads'
    },
    {
      route: 'bucket-lists',
      label: 'Bucket Lists'
    },
    {
      route: 'history',
      label: 'History'
    },
    {
      route: 'leaderboard',
      label: 'Leaderboard'
    },
    {
      route: 'settings',
      label: 'Settings'
    },
  ];

  constructor() { }

  ngOnInit() {
  }
  oncCollapseClicked() {
    this.emitSidenavToggle.emit();
  }

  onLinkClick() {
    this.linkClicked.emit();
  }

}
