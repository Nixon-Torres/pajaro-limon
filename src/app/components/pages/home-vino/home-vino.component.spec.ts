import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeVinoComponent } from './home-vino.component';

describe('HomeVinoComponent', () => {
  let component: HomeVinoComponent;
  let fixture: ComponentFixture<HomeVinoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeVinoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeVinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
