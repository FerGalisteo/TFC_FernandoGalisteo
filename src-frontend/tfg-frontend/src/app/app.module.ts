import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { OfertaListComponent } from './oferta-list/oferta-list.component';
import { OfertaFormComponent } from './oferta-form/oferta-form.component';
import { HeaderComponent } from './header/header.component';
import { OfertaDetailComponent } from './oferta-detail/oferta-detail.component';
import { PerfilProfesionalListComponent } from './perfil-profesional-list/perfil-profesional-list.component';
import { PerfilProfesionalFormComponent } from './perfil-profesional-form/perfil-profesional-form.component';
import { NavigationLinksComponent } from './navigation-links/navigation-links.component';
import { UserListComponent } from './user-list/user-list.component';
import { OfertaVistaComponent } from './oferta-vista/oferta-vista.component';
import { PerfilProfesionalDetailComponent } from './perfil-profesional-detail/perfil-profesional-detail.component';
import { PerfilProfesionalVistaComponent } from './perfil-profesional-vista/perfil-profesional-vista.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignUpComponent,
    OfertaListComponent,
    OfertaFormComponent,
    HeaderComponent,
    OfertaDetailComponent,
    PerfilProfesionalListComponent,
    PerfilProfesionalFormComponent,
    NavigationLinksComponent,
    UserListComponent,
    OfertaVistaComponent,
    PerfilProfesionalDetailComponent,
    PerfilProfesionalVistaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
