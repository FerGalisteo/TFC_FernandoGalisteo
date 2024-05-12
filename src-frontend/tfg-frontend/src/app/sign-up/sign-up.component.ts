import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit {

  registrationForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  registerUser(): void {
    if (this.registrationForm.valid) {
      const { firstName, lastName, email, password } = this.registrationForm.value;
      this.authService.register({ firstName, lastName, email, password }).subscribe(
      (response) => {
        console.log('Registro exitoso:', response);
        // Guardar el token de autenticación en el almacenamiento local
        localStorage.setItem('token', response.token);
        
        this.router.navigate(['/home']);

        Swal.fire('Registro correcto', `Bienvenido!`, 'success');
        
      },
      (error) => {
        console.error('Error en el registro:', error);
        Swal.fire('Error en la petición', 'No hemos podido conectar', 'error');
      }
    );
  }
  
  }
}
