import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishorderComponent } from './dishorder.component';

describe('DishorderComponent', () => {
  let component: DishorderComponent;
  let fixture: ComponentFixture<DishorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
