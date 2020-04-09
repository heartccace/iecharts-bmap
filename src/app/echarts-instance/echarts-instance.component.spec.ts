import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartsInstanceComponent } from './echarts-instance.component';

describe('EchartsInstanceComponent', () => {
  let component: EchartsInstanceComponent;
  let fixture: ComponentFixture<EchartsInstanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EchartsInstanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EchartsInstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
