import { Component, OnInit } from '@angular/core';
import { PerfilProfesionalService } from '../services/perfil-profesional.service';
import { PerfilProfesional } from '../entities/perfil-profesional';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Categorias } from '../entities/categorias';
import { LugarDisponible } from '../entities/lugarDisponible';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil-profesional-list',
  templateUrl: './perfil-profesional-list.component.html',
  styleUrls: ['./perfil-profesional-list.component.scss']
})
export class PerfilProfesionalListComponent implements OnInit {

  perfiles: PerfilProfesional[] = [];
  allPerfiles: PerfilProfesional[] = [];
  filterForm: FormGroup;
  categorias = Object.values(Categorias);
  lugares = Object.values(LugarDisponible);
  page: number = 0;
  size: number = 10;
  totalElements: number = 0;

  constructor(
    private perfilProfesionalService: PerfilProfesionalService,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      categoria: [''],
      lugar: ['']
    });
  }

  ngOnInit(): void {
    this.loadPerfiles();
    this.perfilProfesionalService.getAllPerfiles().subscribe(perfiles => {
      this.allPerfiles = perfiles;
      this.applyFilters(); // Apply filters after loading all profiles
    });
  }

  getPerfiles(): void {
    this.perfilProfesionalService.getPerfiles(this.page, this.size).subscribe(response => {
      this.perfiles = response.content;
      this.totalElements = response.totalElements;
      this.applyFilters();
    });
  }

  loadMore(): void {
    this.page++;
    const { categoria, lugar } = this.filterForm.value;
    this.perfilProfesionalService.getPerfiles(this.page, this.size).subscribe(response => {
      this.allPerfiles = [...this.allPerfiles, ...response.content]; // Append new profiles
      this.applyFilters();
    });
  }

  canEdit(perfil: any): boolean {
    const user = this.authService.getCurrentUser();
    return (
      this.authService.hasRole('ROLE_ADMIN') ||
      (this.authService.hasRole('ROLE_USER') && perfil.usuarioCreador.username === user.username)
    );
  }

  canDelete(perfil: any): boolean {
    return this.canEdit(perfil); // Assuming the same rules apply for deletion
  }

  /*
  deletePerfil(id: number): void {
    this.perfilProfesionalService.deletePerfil(id).subscribe(() => {
      this.perfiles = this.perfiles.filter(perfil => perfil.id !== id);
    });
  }
  */

  deletePerfil(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!'
    }).then(result => {
      if (result.isConfirmed) {
        this.perfilProfesionalService.deletePerfil(id).subscribe(() => {
            Swal.fire('Eliminado!', 'El perfil ha sido eliminado.', 'success');
            this.getPerfiles(); // Refresh the list after deletion
          },
          error => {
            Swal.fire('Error!', 'Hubo un problema al eliminar el perfil.', 'error');
          }
        );
      }
    });
  }

  editPerfil(id: number): void {
    this.router.navigate(['/perfiles/editar', id]);
  }

  detailPerfil(id: number): void {
    this.router.navigate(['/perfil-profesional', id]);
  }

  loadPerfiles(): void {
    this.page = 0;
    this.perfilProfesionalService.getPerfiles(this.page, this.size).subscribe((data: any) => {
      this.perfiles = data.content;
      this.totalElements = data.totalElements;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    const { categoria, lugar } = this.filterForm.value;
    let filteredPerfiles = this.allPerfiles;

    if (categoria) {
      filteredPerfiles = filteredPerfiles.filter(perfil => perfil.categorias.includes(categoria));
    }
    if (lugar) {
      filteredPerfiles = filteredPerfiles.filter(perfil => perfil.lugaresDisponibles.includes(lugar));
    }

    this.perfiles = filteredPerfiles.slice(0, (this.page + 1) * this.size);
    this.totalElements = filteredPerfiles.length;
  }

  onFilterChange(): void {
    this.page = 0;
    this.applyFilters();
  }
}
