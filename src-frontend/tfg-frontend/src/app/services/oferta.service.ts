import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Oferta } from '../entities/oferta'; 

@Injectable({
  providedIn: 'root'
})
export class OfertaService {
  private apiUrl = 'http://localhost:8085/api/v1/ofertas'; // URL del backend

  constructor(private http: HttpClient) { }

  getOfertas(page: number, size: number, usuario?: string, precioMax?: number): Observable<any> {
    let params = new HttpParams().set('page', `${page}`).set('size', `${size}`);
    if (usuario) {
      params = params.set('usuario', usuario);
    }
    if (precioMax) {
      params = params.set('precioMax', precioMax.toString());
    }

    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(this.apiUrl, { /*headers,*/ params });
  }

  getAllOfertas(): Observable<Oferta[]> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Oferta[]>(`${this.apiUrl}/all`).pipe(
      catchError(this.handleError)
    );
  }

  getOfertaById(id: number): Observable<Oferta> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Oferta>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  createOferta(oferta: Oferta): Observable<void> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<void>(this.apiUrl, oferta, { headers });
  }

  updateOferta(id: number, oferta: Oferta): Observable<Oferta> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.put<Oferta>(`${this.apiUrl}/${id}`, oferta, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  deleteOferta(id: number): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  addCandidato(ofertaId: number): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<void>(`${this.apiUrl}/addCandidato/${ofertaId}`, {}, { headers });
  }

  removeCandidato(ofertaId: number): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.delete<void>(`${this.apiUrl}/removeCandidato/${ofertaId}`, { headers });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      console.error('Ocurrió un error:', error.error.message);
    } else {
      // Error del lado del servidor
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // Retorna un observable con un mensaje de error user-friendly
    return throwError('Algo salió mal; por favor intente nuevamente más tarde.');
  }
}
