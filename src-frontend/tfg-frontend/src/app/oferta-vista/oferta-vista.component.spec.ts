import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertaVistaComponent } from './oferta-vista.component';

describe('OfertaVistaComponent', () => {
  let component: OfertaVistaComponent;
  let fixture: ComponentFixture<OfertaVistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OfertaVistaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OfertaVistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
