import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadernavbarComponent } from './headernavbar.component';

describe('HeadernavbarComponent', () => {
  let component: HeadernavbarComponent;
  let fixture: ComponentFixture<HeadernavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadernavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadernavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
