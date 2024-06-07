import { Component, OnInit } from '@angular/core';
import { PerfilProfesionalService } from '../services/perfil-profesional.service';
import { PerfilProfesional } from '../entities/perfil-profesional';

@Component({
  selector: 'app-perfil-profesional-list',
  templateUrl: './perfil-profesional-list.component.html',
  styleUrls: ['./perfil-profesional-list.component.scss']
})
export class PerfilProfesionalListComponent implements OnInit {
  perfiles: PerfilProfesional[] = [];

  constructor(private perfilProfesionalService: PerfilProfesionalService) { }

  ngOnInit(): void {
    this.perfilProfesionalService.getPerfiles().subscribe(perfiles => {
      this.perfiles = perfiles;
    });
  }

  deletePerfil(id: number): void {
    this.perfilProfesionalService.deletePerfil(id).subscribe(() => {
      this.perfiles = this.perfiles.filter(perfil => perfil.id !== id);
    });
  }

  editPerfil(id: number){}
}

