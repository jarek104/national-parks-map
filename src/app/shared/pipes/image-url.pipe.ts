import { Pipe, PipeTransform } from '@angular/core';

import { Photo } from 'src/app/models/photo';
import { Place } from 'src/app/models/place';

@Pipe({name: 'imageUrl'})
export class ImageUrlPipe implements PipeTransform {
  transform(item: Photo | Place, size: 'small' | 'medium' ): string {
    if (!item) {
      return;
    }
    let filename = '';
    const splitName = item.originalFileName.split('.')
    if (size === 'small') {
      filename = `${splitName[0]}_400x400.jpg`;
    } else if (size === 'medium') {
      filename = `${splitName[0]}_800x800.jpg`;
    }
    return item.originalDownloadUrl.replace(item.originalFileName, filename);
  }
}