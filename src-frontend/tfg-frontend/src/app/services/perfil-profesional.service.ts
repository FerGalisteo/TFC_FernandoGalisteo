import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { PerfilProfesional } from '../entities/perfil-profesional';

@Injectable({
  providedIn: 'root'
})
export class PerfilProfesionalService {
  private apiUrl = 'http://localhost:8085/api/v1/profesionales';

  constructor(private http: HttpClient) { }

  getPerfiles(page: number, size: number): Observable<any> {
    let params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<any>(this.apiUrl, { params });
  }

  getPerfilesPorUsuario(id: number): Observable<PerfilProfesional[]> {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<PerfilProfesional[]>(`${this.apiUrl}/usuario/${id}`, { headers });
  }

  getPerfilById(id: number): Observable<PerfilProfesional[]> {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<PerfilProfesional[]>(`${this.apiUrl}/${id}`, { headers });
  }

  createPerfil(perfil: PerfilProfesional, imagenes: File[]): Observable<PerfilProfesional> {
    const formData: FormData = new FormData();
    formData.append('publicacion', JSON.stringify(perfil));
    imagenes.forEach((imagen, index) => {
      formData.append(`imagen${index}`, imagen);
    });

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<PerfilProfesional>(this.apiUrl, formData, { headers }).pipe(
      catchError(this.handleError));
  }

  updatePerfil(id: number, perfil: PerfilProfesional, imagenes: File[]): Observable<PerfilProfesional> {
    const formData: FormData = new FormData();
    formData.append('publicacion', JSON.stringify(perfil));
    imagenes.forEach((imagen, index) => {
      formData.append(`imagen${index}`, imagen);
    });

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<PerfilProfesional>(`${this.apiUrl}/${id}`, formData, { headers }).pipe(
      catchError(this.handleError));
  }

  deletePerfil(id: number): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError(this.handleError)
    );
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
