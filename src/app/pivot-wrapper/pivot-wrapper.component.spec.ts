import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PivotWrapperComponent } from './pivot-wrapper.component';

describe('PivotWrapperComponent', () => {
  let component: PivotWrapperComponent;
  let fixture: ComponentFixture<PivotWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PivotWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PivotWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
