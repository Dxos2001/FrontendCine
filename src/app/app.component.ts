import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarteleraComponent } from "./components/cartelera/cartelera.component";
import { PeliculaComponent } from './components/pelicula/pelicula.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalLoginComponent } from './components/modal-login/modal-login.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CarteleraComponent, PeliculaComponent, ModalLoginComponent, AppComponent, MatButtonModule, MatDialogModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'FrontendCine';

  constructor(private router: Router) {}

}
