import { Component, OnInit } from '@angular/core';
import { OfertaService } from '../services/oferta.service';
import { PerfilProfesionalService } from '../services/perfil-profesional.service';
import { Oferta } from '../entities/oferta';
import { PerfilProfesional } from '../entities/perfil-profesional';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ofertas: Oferta[] = [];
  perfiles: PerfilProfesional[] = [];

  constructor(
    private ofertaService: OfertaService,
    private perfilProfesionalService: PerfilProfesionalService,
    private authService: AuthService
  ) {}
logout(): void {
    this.authService.logout();

  }
  ngOnInit(): void {
    this.loadOfertas();
    this.loadPerfiles();
  }

  loadOfertas(): void {
    this.ofertaService.getOfertas(0, 3).subscribe(response => {
      this.ofertas = response.content;
    });
  }

  loadPerfiles(): void {
    this.perfilProfesionalService.getPerfiles(0, 3).subscribe(response => {
      this.perfiles = response.content;
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
