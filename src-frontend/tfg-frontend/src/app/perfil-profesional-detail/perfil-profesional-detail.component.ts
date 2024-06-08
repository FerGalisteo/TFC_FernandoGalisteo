import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PerfilProfesionalService } from '../services/perfil-profesional.service';

@Component({
  selector: 'app-perfil-profesional-detail',
  templateUrl: './perfil-profesional-detail.component.html',
  styleUrls: ['./perfil-profesional-detail.component.scss']
})
export class PerfilProfesionalDetailComponent implements OnInit {
  perfil: any;

  constructor(
    private route: ActivatedRoute,
    private perfilProfesionalService: PerfilProfesionalService
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
}
