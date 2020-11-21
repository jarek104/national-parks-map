import { Pipe, PipeTransform } from '@angular/core';

import { Photo } from 'src/app/models/photo';
import { Place } from 'src/app/models/place';

@Pipe({name: 'thumbnailUrl'})
export class ThumbnailUrlPipe implements PipeTransform {
  transform(item: Photo | Place): string {
    if (!item) {
      return;
    }
    const splitName = item.originalFileName.split('.')
    const smallFileName = `${splitName[0]}_400x400.jpg`;
    return item.originalDownloadUrl.replace(item.originalFileName, smallFileName);
  }
}