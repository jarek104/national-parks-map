import { Pipe, PipeTransform } from '@angular/core';

import { Photo } from 'src/app/models/photo';

@Pipe({name: 'thumbnailUrl'})
export class ThumbnailUrlPipe implements PipeTransform {
  transform(photo: Photo): string {
    if (!photo) {
      return;
    }
    const smallFileName = photo.originalFileName.replace(".", "_400x400.");
    const temp = photo.originalDownloadUrl.replace(photo.originalFileName, smallFileName);
    return temp;
  }
}