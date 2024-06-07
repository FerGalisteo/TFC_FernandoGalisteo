import { TestBed } from '@angular/core/testing';

import { PerfilProfesionalService } from './perfil-profesional.service';

describe('PerfilProfesionalService', () => {
  let service: PerfilProfesionalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerfilProfesionalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
