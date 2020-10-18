import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Photo } from 'src/app/models/photo';

@Component({
  selector: 'sp-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss']
})
export class TrendingComponent implements OnInit {

  private jsonFileURL = '../assets/mocks/photos2.json';

  photos: BehaviorSubject<Photo[]> = new BehaviorSubject([]);

  constructor(private http: HttpClient) {
    this.getPhotos().subscribe(data => {
      console.log('here', data);

      this.photos.next(data);
    });
  }

  getPhotos(): Observable<Photo[]> {
    return this.http.get<any>(this.jsonFileURL);
  }

  ngOnInit() {
  }

}
