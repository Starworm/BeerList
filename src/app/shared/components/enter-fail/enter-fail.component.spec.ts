import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterFailComponent } from './enter-fail.component';

describe('EnterFailComponent', () => {
  let component: EnterFailComponent;
  let fixture: ComponentFixture<EnterFailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterFailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterFailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
