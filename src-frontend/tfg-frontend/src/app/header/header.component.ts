import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { PerfilProfesionalService } from '../services/perfil-profesional.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  isAuthenticated = false;
  isAdmin = false;
  isUser = false;
  perfilProfesionalId: number | null = null;
  windowScrolled = false;
  
  constructor(private authService: AuthService, private router: Router, private perfilProfesionalService: PerfilProfesionalService) { }

  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      this.windowScrolled = window.scrollY > 300;
    });
    this.authService.getCurrentUser();
    console.log(this.authService.getCurrentUser())
    this.isUserAdmin();
    this.isUserUser();
    this.updateUserStatus();
    if (this.isAuthenticated) {
      this.checkPerfilProfesional();
    }
  }


  updateUserStatus(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    console.log('isUser:', this.isUser);
    console.log('isAdmin:', this.isAdmin);
  }

  checkPerfilProfesional(): void {
    this.perfilProfesionalService.getMiPerfil().subscribe(perfil => {
      if (perfil) {
        this.perfilProfesionalId = perfil.id;
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.updateUserStatus();
  }

  isUserAdmin(): boolean{
      return this.authService.hasRole('ROLE_ADMIN')
  }
  isUserUser(): boolean{
    return this.authService.hasRole('ROLE_USER')
  }
  
  closeOffcanvas(): void {
    const offcanvasElement = document.getElementById('offcanvasNavbar');
    if (offcanvasElement) {
      offcanvasElement.classList.remove('show');
      const backdrop = document.querySelector('.offcanvas-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
      document.body.classList.remove('offcanvas-open');
    }
  }

  

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}


