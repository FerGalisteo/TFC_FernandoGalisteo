import { Component, OnInit } from '@angular/core';
import { OfertaService } from '../services/oferta.service';
import { Oferta } from '../entities/oferta';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-oferta-list',
  templateUrl: './oferta-list.component.html',
  styleUrls: ['./oferta-list.component.scss']
})
export class OfertaListComponent implements OnInit {
  ofertas: Oferta[] = [];
  page: number = 0;
  size: number = 10;
  totalElements: number = 0;

  constructor(
    private ofertaService: OfertaService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getOfertas();
  }

  getOfertas(): void {
    this.ofertaService.getOfertas(this.page, this.size).subscribe(response => {
      this.ofertas = response.content;
      this.totalElements = response.totalElements;
    });
  }

  loadMore(): void {
    this.page++;
    this.ofertaService.getOfertas(this.page, this.size).subscribe(response => {
      this.ofertas = [...this.ofertas, ...response.content];
    });
  }

  canEdit(oferta: any): boolean {
    const user = this.authService.getCurrentUser();
    return (
      this.authService.hasRole('ROLE_ADMIN') ||
      (this.authService.hasRole('ROLE_USER') && oferta.usuarioCreador.username === user.username)
    );
  }

  canDelete(oferta: any): boolean {
    return this.canEdit(oferta); // Assuming the same rules apply for deletion
  }

  editOferta(oferta: any): void {
    this.router.navigate(['/oferta/editar', oferta.id]);
  }

  detailOferta(oferta: any): void {
    this.router.navigate(['/oferta/', oferta.id]);
  }

  deleteOferta(id: number): void {
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
        this.ofertaService.deleteOferta(id).subscribe(
          () => {
            Swal.fire('Eliminado!', 'La oferta ha sido eliminada.', 'success');
            this.loadOfertas(); // Refresh the list after deletion
          },
          error => {
            Swal.fire('Error!', 'Hubo un problema al eliminar la oferta.', 'error');
          }
        );
      }
    });
  }

  loadOfertas(): void {
    this.page = 0;
    this.ofertaService.getOfertas(this.page, this.size).subscribe((data: any) => {
      this.ofertas = data.content;
      this.totalElements = data.totalElements;
    });
  }

  truncateDescription(description: string, wordLimit: number): string {
    const words = description.split(' ');
    if (words.length <= wordLimit) {
      return description;
    }
    return words.slice(0, wordLimit).join(' ') + '...';
  }
}
