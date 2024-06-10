import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertaService } from '../services/oferta.service';
import { Oferta } from '../entities/oferta';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-oferta-detail',
  templateUrl: './oferta-detail.component.html',
  styleUrls: ['./oferta-detail.component.scss']
})
export class OfertaDetailComponent implements OnInit {
  oferta: Oferta | undefined;
  isCandidato: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private ofertaService: OfertaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadOferta();
  }

  loadOferta(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.ofertaService.getOfertaById(+id).subscribe(oferta => {
        this.oferta = oferta;
        this.checkIfCandidato();
      });
    }
  }

  checkIfCandidato(): void {
    if (this.oferta && this.authService.getCurrentUser()) {
      const user = this.authService.getCurrentUser();
      this.isCandidato = this.oferta.candidatos.some(c => c.usuarioCreador.email === user.email);
    }
  }

  addCandidato(): void {
    if (this.oferta) {
      this.ofertaService.addCandidato(this.oferta.id).subscribe(
        () => {
          Swal.fire('¡Te has apuntado!', 'Te has apuntado correctamente a la oferta.', 'success');
          this.isCandidato = true;
        },
        error => {
          Swal.fire('Error', 'Hubo un problema al intentar apuntarte a la oferta.', 'error');
        }
      );
    }
  }

  removeCandidato(): void {
    if (this.oferta) {
      this.ofertaService.removeCandidato(this.oferta.id).subscribe(
        () => {
          Swal.fire('¡Te has desapuntado!', 'Te has desapuntado correctamente de la oferta.', 'success');
          this.isCandidato = false;
        },
        error => {
          Swal.fire('Error', 'Hubo un problema al intentar desapuntarte de la oferta.', 'error');
        }
      );
    }
  }
}
