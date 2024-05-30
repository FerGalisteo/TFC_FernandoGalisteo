import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { TokenService } from '../services/token.service';
import { UserService } from '../services/user.service';
import { Usuario } from '../entities/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  boton() {
  throw new Error('Method not implemented.');
  }
    user: Usuario = new Usuario();
    token: string | null = null;
    users: any[] = [];
  
    constructor(private authService: AuthService, private userService:UserService, private tokenService:TokenService) { }
  
  
    onSubmit() {
      console.log(this.user);
      this.authService.login(this.user).subscribe({
        next: (token) => {
          this.token = token;
          if (typeof window !== 'undefined') {
          localStorage.setItem('token', token);
          }
          this.authService.recoverUser(token).subscribe({
            next: (user) => {
              console.log(user);
            }
          })
          
          Swal.fire('Login correcto', 'success');
        },
        error: (error) => {
          Swal.fire('Error en la petición', 'No hemos podido conectar', 'error');
        }
      });
    }
  
    ngOnInit(): void {
      const token = this.tokenService.getToken();
      if (token) {
      this.userService.getUsers(token).subscribe({
        next: (response) => {
          this.users = response.data;
        },
        error: (err) => {
          console.error('Error al obtener los usuarios:', err);
        }
      });
    }  else {
      console.log('Token aún no creado');
  }
    }
  
  
  
  
  };
  