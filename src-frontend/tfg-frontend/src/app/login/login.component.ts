import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { TokenService } from '../services/token.service';
import { UserService } from '../services/user.service';
import { Usuario } from '../entities/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  token: string | null = null;
  users: any[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    const token = this.tokenService.getToken();
    if (token) {
      this.userService.getAllUsers().subscribe({
        next: (response) => {
          
        },
        error: (err) => {
          console.error('Error al obtener los usuarios:', err);
        }
      });
    } else {
      console.log('Token aún no creado');
    }
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      Swal.fire('Error', 'Por favor, complete el formulario correctamente', 'error');
      return;
    }

    const loginData: Usuario = this.loginForm.value;
    this.authService.login(loginData).subscribe({
      next: (token) => {
        this.token = token;
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', token);
        }
        this.authService.recoverUser(token).subscribe({
          next: (user) => {
            console.log(user);
          }
        });
        this.router.navigate(['/home']);
        Swal.fire('Login correcto', 'Redirigiendo');
      },
      error: (error) => {
        Swal.fire('Error en la petición', 'Contraseña incorrecta', 'error');
      }
    });
  }
}
