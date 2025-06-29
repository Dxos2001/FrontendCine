import { Routes } from '@angular/router';
import { CarteleraComponent } from './components/cartelera/cartelera.component';
import { PeliculaComponent } from './components/pelicula/pelicula.component';

export const routes: Routes = [
  { path: '', component: CarteleraComponent },
  { path: 'pelicula/:id', component: PeliculaComponent },
];
