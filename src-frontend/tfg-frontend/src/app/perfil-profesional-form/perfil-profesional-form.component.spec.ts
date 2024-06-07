import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilProfesionalFormComponent } from './perfil-profesional-form.component';

describe('PerfilProfesionalFormComponent', () => {
  let component: PerfilProfesionalFormComponent;
  let fixture: ComponentFixture<PerfilProfesionalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerfilProfesionalFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerfilProfesionalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
