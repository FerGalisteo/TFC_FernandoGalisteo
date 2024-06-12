import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8085/api/v1/auth/signin';
  private registerUrl = 'http://localhost:8085/api/v1/auth/signup';
  private tokenUrl = 'http://localhost:8085/token'

  private currentUser: any = null;

  constructor(private http: HttpClient) { }

  login(user: { email: string, password: string }): Observable<any> {
    return this.http.post(this.apiUrl, user).pipe(
      map((response: any) => response.token),
      tap(token => {
        localStorage.setItem('token', token);
        this.loadCurrentUser(token);
      })
    );
  }

  register(user: { firstName: string, lastName: string, email: string, password: string }): Observable<any> {
    return this.http.post(this.registerUrl, user);
  }

  recoverUser(_token: string): Observable<any> {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + _token
    });
    return this.http.get<any>(this.tokenUrl, { headers: headers }).pipe(
      tap(user => this.currentUser = user)
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUser = null;
  }

  getCurrentUser(): any {
    if (!this.currentUser) {
      const token = localStorage.getItem('token');
      if (token) {
        this.loadCurrentUser(token);
      }
    }
    return this.currentUser;
  }

  loadCurrentUser(token: string): void {
    this.recoverUser(token).subscribe(
      user => this.currentUser = user,
      err => {
        this.logout();
      }
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user && user.roles && user.roles.includes(role);
  }
}

