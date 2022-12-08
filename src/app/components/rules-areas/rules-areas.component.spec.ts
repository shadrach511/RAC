import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesAreasComponent } from './rules-areas.component';

describe('RulesAreasComponent', () => {
  let component: RulesAreasComponent;
  let fixture: ComponentFixture<RulesAreasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RulesAreasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RulesAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
