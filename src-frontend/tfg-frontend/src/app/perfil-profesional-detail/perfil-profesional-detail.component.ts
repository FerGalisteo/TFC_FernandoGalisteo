import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfilProfesionalService } from '../services/perfil-profesional.service';
import { AuthService } from '../services/auth.service';
import { PerfilProfesional } from '../entities/perfil-profesional';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil-profesional-detail',
  templateUrl: './perfil-profesional-detail.component.html',
  styleUrls: ['./perfil-profesional-detail.component.scss']
})
export class PerfilProfesionalDetailComponent implements OnInit {
  perfil: any;
  perfiles: PerfilProfesional[] = [];

  constructor(
    private route: ActivatedRoute,
    private perfilProfesionalService: PerfilProfesionalService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadPerfil(+id);
    }
  }

  loadPerfil(id: number): void {
    this.perfilProfesionalService.getPerfilById(id).subscribe({
      next: (perfil) => {
        this.perfil = perfil;
      },
      error: (err) => {
        console.error('Error al cargar el perfil profesional:', err);
      }
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
            this.router.navigate(['/home']); // Refresh the list after deletion
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
}
