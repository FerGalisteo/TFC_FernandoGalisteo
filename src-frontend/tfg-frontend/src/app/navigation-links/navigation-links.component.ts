import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navigation-links',
  templateUrl: './navigation-links.component.html',
  styleUrls: ['./navigation-links.component.scss']
})
export class NavigationLinksComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  isUserAdmin(): boolean {
    return this.authService.hasRole('ROLE_ADMIN');
  }

  isUserUser(): boolean {
    return this.authService.hasRole('ROLE_USER');
  }

  logout(): void {
    this.authService.logout();
  }
}
