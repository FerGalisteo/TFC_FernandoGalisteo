import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilProfesionalVistaComponent } from './perfil-profesional-vista.component';

describe('PerfilProfesionalVistaComponent', () => {
  let component: PerfilProfesionalVistaComponent;
  let fixture: ComponentFixture<PerfilProfesionalVistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerfilProfesionalVistaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerfilProfesionalVistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
