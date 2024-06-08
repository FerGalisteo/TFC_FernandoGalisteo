import { Component, OnInit } from '@angular/core';
import { PerfilProfesionalService } from '../services/perfil-profesional.service';
import { PerfilProfesional } from '../entities/perfil-profesional';
import { Router } from '@angular/router';


@Component({
  selector: 'app-perfil-profesional-list',
  templateUrl: './perfil-profesional-list.component.html',
  styleUrls: ['./perfil-profesional-list.component.scss']
})
export class PerfilProfesionalListComponent implements OnInit {

  perfiles: PerfilProfesional[] = [];
  page: number = 0;
  size: number = 10;
  totalElements: number = 0;
  
  constructor(private perfilProfesionalService: PerfilProfesionalService, private router: Router) { }

  ngOnInit(): void {
    this.getPerfiles();
  }

  getPerfiles(): void {
    this.perfilProfesionalService.getPerfiles(this.page, this.size).subscribe(response => {
      this.perfiles = this.perfiles.concat(response.content);
      this.totalElements = response.totalElements;
    });
  }
  deletePerfil(id: number): void {
    this.perfilProfesionalService.deletePerfil(id).subscribe(() => {
      this.perfiles = this.perfiles.filter(perfil => perfil.id !== id);
    });
  }

  editPerfil(id: number): void{
    this.router.navigate(['/perfiles/editar', id]);
  }
  
detailPerfil(id: number):void {
this.router.navigate(['/perfil-profesional', id]);
}
}

