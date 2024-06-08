import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilProfesionalDetailComponent } from './perfil-profesional-detail.component';

describe('PerfilProfesionalDetailComponent', () => {
  let component: PerfilProfesionalDetailComponent;
  let fixture: ComponentFixture<PerfilProfesionalDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerfilProfesionalDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerfilProfesionalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
