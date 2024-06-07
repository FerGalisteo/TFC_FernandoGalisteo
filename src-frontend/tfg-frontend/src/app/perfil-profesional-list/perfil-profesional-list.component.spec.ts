import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilProfesionalListComponent } from './perfil-profesional-list.component';

describe('PerfilProfesionalListComponent', () => {
  let component: PerfilProfesionalListComponent;
  let fixture: ComponentFixture<PerfilProfesionalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerfilProfesionalListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerfilProfesionalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
