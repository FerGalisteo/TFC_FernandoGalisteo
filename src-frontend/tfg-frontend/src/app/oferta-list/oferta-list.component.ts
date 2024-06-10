import { Component, OnInit } from '@angular/core';
import { OfertaService } from '../services/oferta.service';
import { Oferta } from '../entities/oferta';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Categorias } from '../entities/categorias';
import { LugarDisponible } from '../entities/lugarDisponible';

@Component({
  selector: 'app-oferta-list',
  templateUrl: './oferta-list.component.html',
  styleUrls: ['./oferta-list.component.scss']
})
export class OfertaListComponent implements OnInit {
  ofertas: Oferta[] = [];
  allOfertas: Oferta[] = [];
  filterForm: FormGroup;
  categorias = Object.values(Categorias);
  lugares = Object.values(LugarDisponible);
  page: number = 0;
  size: number = 10;
  totalElements: number = 0;

  constructor(
    private ofertaService: OfertaService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      categoria: [''],
      lugar: ['']
    });
  }

  ngOnInit(): void {
    this.loadOfertas();
    this.ofertaService.getAllOfertas().subscribe(ofertas => {
      this.allOfertas = ofertas;
      this.applyFilters(); // Apply filters after loading all offers
    });
  }

  getOfertas(): void {
    this.ofertaService.getOfertas(this.page, this.size).subscribe(response => {
      this.ofertas = response.content;
      this.totalElements = response.totalElements;
      this.applyFilters();
    });
  }

  loadMore(): void {
    this.page++;
    const { categoria, lugar } = this.filterForm.value;
    this.ofertaService.getOfertas(this.page, this.size).subscribe(response => {
      this.allOfertas = [...this.allOfertas, ...response.content]; // Append new offers
      this.applyFilters();
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
    return this.canEdit(oferta);
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
            this.loadOfertas();
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
      this.applyFilters();
    });
  }

  applyFilters(): void {
    const { categoria, lugar } = this.filterForm.value;
    let filteredOfertas = this.allOfertas;

    if (categoria) {
      filteredOfertas = filteredOfertas.filter(oferta => oferta.categorias.includes(categoria));
    }
    if (lugar) {
      filteredOfertas = filteredOfertas.filter(oferta => oferta.lugar === lugar);
    }

    this.ofertas = filteredOfertas.slice(0, (this.page + 1) * this.size);
    this.totalElements = filteredOfertas.length;
  }

  onFilterChange(): void {
    this.page = 0;
    this.applyFilters();
  }

  truncateDescription(description: string, wordLimit: number): string {
    const words = description.split(' ');
    if (words.length <= wordLimit) {
      return description;
    }
    return words.slice(0, wordLimit).join(' ') + '...';
  }
}
