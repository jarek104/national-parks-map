import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-feature-item',
  templateUrl: './home-feature-item.component.html',
  styleUrls: ['./home-feature-item.component.scss']
})
export class HomeFeatureItemComponent implements OnInit {


  @HostBinding('class.reverse') @Input() reverse: boolean = false;

  @Input() text = 'Empty'
  @Input() title = 'Empty'

  @Input() imageUrl = 'https://press.ktm.com/Content/444331/4c1768ec-f0d6-4ac1-bb14-83d350f1377d/600/1200/.jpg' 


  constructor() { }

  ngOnInit(): void {
  }

}
