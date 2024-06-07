import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertaService } from '../services/oferta.service';
import { Oferta } from '../entities/oferta';

@Component({
  selector: 'app-oferta-detail',
  templateUrl: './oferta-detail.component.html',
  styleUrls: ['./oferta-detail.component.scss']
})
export class OfertaDetailComponent implements OnInit {
  oferta: Oferta | undefined;

  constructor(
    private route: ActivatedRoute,
    private ofertaService: OfertaService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.ofertaService.getOfertaById(+id).subscribe((data: Oferta) => {
        this.oferta = data;
      });
    }
  }
}
