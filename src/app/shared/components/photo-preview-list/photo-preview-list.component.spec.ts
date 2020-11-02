import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoPreviewListComponent } from './photo-preview-list.component';

describe('PhotoPreviewListComponent', () => {
  let component: PhotoPreviewListComponent;
  let fixture: ComponentFixture<PhotoPreviewListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoPreviewListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoPreviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
