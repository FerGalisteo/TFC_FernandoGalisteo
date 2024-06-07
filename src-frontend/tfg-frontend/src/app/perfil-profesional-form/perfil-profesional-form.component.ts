import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfilProfesionalService } from '../services/perfil-profesional.service';
import { PerfilProfesional } from '../entities/perfil-profesional';
import { LugarDisponible } from '../entities/lugarDisponible';
import { Categorias } from '../entities/categorias';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil-profesional-form',
  templateUrl: './perfil-profesional-form.component.html',
  styleUrls: ['./perfil-profesional-form.component.scss']
})
export class PerfilProfesionalFormComponent implements OnInit {
  perfilForm: FormGroup;
  perfilId: number | null = null;
  lugaresDisponibles = Object.values(LugarDisponible);
  categorias = Object.values(Categorias); 
  imagenes: File[] = [];

  constructor(
    private fb: FormBuilder,
    private perfilProfesionalService: PerfilProfesionalService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.perfilForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: ['', [Validators.required, Validators.maxLength(2000)]],
      categorias: [[], Validators.required],
      lugaresDisponibles: [[], Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.perfilId = +id;
        this.loadPerfil(this.perfilId);
      }
    });
  }

  loadPerfil(id: number): void {
    this.perfilProfesionalService.getPerfilesPorUsuario(id).subscribe(perfil => {
      this.perfilForm.patchValue(perfil);
    });
  }

  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length) {
      this.imagenes = Array.from(event.target.files);
    }
  }

  onSubmit(): void {
    if (this.perfilForm.valid) {
      const perfil: PerfilProfesional = this.perfilForm.value;

      if (this.perfilId) {
        this.perfilProfesionalService.updatePerfil(this.perfilId, perfil, this.imagenes).subscribe(() => {
          Swal.fire('¡Perfil actualizado!', 'El perfil se ha actualizado correctamente.', 'success')
            .then(() => this.router.navigate(['/perfiles']));
        }, error => {
          Swal.fire('Error', 'Hubo un problema al actualizar el perfil.', 'error');
        });
      } else {
        this.perfilProfesionalService.createPerfil(perfil, this.imagenes).subscribe(() => {
          Swal.fire('¡Perfil creado!', 'El perfil se ha creado correctamente.', 'success')
            .then(() => this.router.navigate(['/perfiles']));
        }, error => {
          Swal.fire('Error', 'Hubo un problema al crear el perfil.', 'error');
        });
      }
    }
  }
}
