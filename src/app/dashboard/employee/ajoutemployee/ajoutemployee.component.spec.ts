import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutemployeeComponent } from './ajoutemployee.component';

describe('AjoutemployeeComponent', () => {
  let component: AjoutemployeeComponent;
  let fixture: ComponentFixture<AjoutemployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutemployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutemployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
