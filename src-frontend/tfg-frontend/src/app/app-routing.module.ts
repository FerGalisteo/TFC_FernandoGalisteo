import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { OfertaFormComponent } from './oferta-form/oferta-form.component';
import { OfertaListComponent } from './oferta-list/oferta-list.component';
import { OfertaDetailComponent } from './oferta-detail/oferta-detail.component';
import { PerfilProfesionalListComponent } from './perfil-profesional-list/perfil-profesional-list.component';
import { PerfilProfesionalFormComponent } from './perfil-profesional-form/perfil-profesional-form.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'ofertas', component: OfertaListComponent, canActivate: [AuthGuard] },
  { path: 'oferta/nueva', component: OfertaFormComponent, canActivate: [AuthGuard] },
  { path: 'oferta/editar/:id', component: OfertaFormComponent, canActivate: [AuthGuard] },
  { path: 'oferta/:id', component: OfertaDetailComponent, canActivate: [AuthGuard] },
  { path: 'perfiles', component: PerfilProfesionalListComponent },
  { path: 'perfiles/crear', component: PerfilProfesionalFormComponent, canActivate: [AuthGuard] },
  { path: 'perfiles/editar/:id', component: PerfilProfesionalFormComponent, canActivate: [AuthGuard] },
  { path: 'admin/users', component: UserListComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/ofertas', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
