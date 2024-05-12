import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8085/api/v1/auth/signin';
  private registerUrl = 'http://localhost:8085/api/v1/auth/signup';
  private tokenUrl = 'http://localhost:8085/token'

  constructor(private http: HttpClient) { }

  login(user: { email: string, password: string }): Observable<any> {
    return this.http.post(this.apiUrl, user).pipe(
      map((response: any) => response.token)
    );
  }

  register(user: { firstName: string, lastName: string, email: string, password: string }): Observable<any> {
    return this.http.post(this.registerUrl, user);
  }

  recoverUser(_token: string): Observable<any>{
    let headers = new HttpHeaders({
      'Authorization': 'Bearer '+_token
    })
    return this.http.get<any>(this.tokenUrl, {headers:headers});
  }

  logout(): void {
    localStorage.removeItem('token');
  }

}