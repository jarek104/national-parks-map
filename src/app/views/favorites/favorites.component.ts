import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Photo } from 'src/app/models/photo';
import { listItemsAnimation } from 'src/app/shared/animations/list-stagger';

@Component({
  selector: 'sp-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  animations: [listItemsAnimation]
})
export class FavoritesComponent {

  private jsonFileURL = '../../../assets/mocks/photos2.json';

  favorites: Photo[] = [];

  constructor(private http: HttpClient) {
    this.getPhotos().subscribe(data => {
      // console.log(data);

      this.favorites = data;
    });
  }

  getPhotos(): Observable<Photo[]> {
    return this.http.get<any>(this.jsonFileURL);
  }

}
