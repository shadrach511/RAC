import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesVersionComponent } from './rules-version.component';

describe('RulesVersionComponent', () => {
  let component: RulesVersionComponent;
  let fixture: ComponentFixture<RulesVersionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RulesVersionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RulesVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
