import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarCabinetComponent } from './bar-cabinet.component';

describe('BarCabinetComponent', () => {
  let component: BarCabinetComponent;
  let fixture: ComponentFixture<BarCabinetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarCabinetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarCabinetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
