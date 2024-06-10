import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OfertaService } from '../services/oferta.service';
import { Oferta } from '../entities/oferta';
import { LugarDisponible } from '../entities/lugarDisponible';
import Swal from 'sweetalert2';
import { Categorias } from '../entities/categorias';

@Component({
  selector: 'app-oferta-form',
  templateUrl: './oferta-form.component.html',
  styleUrls: ['./oferta-form.component.scss']
})
export class OfertaFormComponent implements OnInit {
  ofertaForm: FormGroup;
  ofertaId: number | null = null;
  lugaresDisponibles = Object.values(LugarDisponible);
  categorias = Object.values(Categorias);
  oferta: Oferta;

  constructor(
    private fb: FormBuilder,
    private ofertaService: OfertaService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.ofertaForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(50)]],
      descripcion: ['', [Validators.maxLength(200)]],
      precio: ['', [Validators.required, Validators.min(0)]],
      fechaComienzo: ['', Validators.required],
      lugar: ['', Validators.required],
      categoria: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.ofertaId = +id;
        this.loadOferta(this.ofertaId);
      }
    });
  }

  loadOferta(id: number): void {
    this.ofertaService.getOfertaById(id).subscribe(oferta => {
      console.log(oferta.id);
      this.oferta = oferta;
      this.ofertaForm.patchValue(oferta);
    });
  }

  onSubmit(): void {
    if (this.ofertaForm.valid) {
      const oferta: Oferta = this.ofertaForm.value;

      if (this.ofertaId) {
        this.ofertaService.updateOferta(this.ofertaId, oferta).subscribe(() => {
          Swal.fire({
            title: '¡Oferta actualizada!',
            text: 'La oferta se ha actualizado correctamente.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.router.navigate(['/ofertas']);
          });
        }, error => {
          console.error('Error al actualizar la oferta:', error);
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al actualizar la oferta.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
      } else {
        this.ofertaService.createOferta(oferta).subscribe(() => {
          Swal.fire({
            title: '¡Oferta creada!',
            text: 'La oferta se ha creado correctamente.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.router.navigate(['/ofertas']);
          });
        }, error => {
          console.error('Error al crear la oferta:', error);
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al crear la oferta.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
      }
    }
  }
}
