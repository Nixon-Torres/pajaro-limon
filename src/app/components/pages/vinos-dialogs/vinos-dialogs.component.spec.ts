import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VinosDialogsComponent } from './vinos-dialogs.component';

describe('VinosDialogsComponent', () => {
  let component: VinosDialogsComponent;
  let fixture: ComponentFixture<VinosDialogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VinosDialogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VinosDialogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
