import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomKnowledgeComponent } from './room-knowledge.component';

describe('RoomKnowledgeComponent', () => {
  let component: RoomKnowledgeComponent;
  let fixture: ComponentFixture<RoomKnowledgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomKnowledgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomKnowledgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
