import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//sweetalert2 para mostrar alertar por el lado de TypeScript

//http para comunicacion con la REST API DE NUESTRO BACKEND EN FIREBASE
import { HttpClientModule } from '@angular/common/http';
//formulario aplicacion
import {FormsModule} from '@angular/forms'
//rutas de la aplicacon
import { AppRoutingModule } from './app-routing.module';
//componentes de la aplicacion
import { AppComponent } from './app.component';
import { HeroeComponent } from './pages/heroe/heroe.component';
import { HeroesComponent } from './pages/heroes/heroes.component';
import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    HeroeComponent,
    HeroesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
