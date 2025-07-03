import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CarteleraService } from '../../services/cartelera.service';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalLoginComponent } from '../modal-login/modal-login.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-cartelera',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './cartelera.component.html',
  styleUrls: ['./cartelera.component.css']
})
export class CarteleraComponent implements OnInit{

  error: string = "";
  filtroGeneros: any[] = [];
  filtroSalas: any[] = [];
  generos: string[] = [];
  cartelera: any[] = [];
  cargando: boolean = true;
  generoSeleccionado: number = 0;
  peliculasFiltradas: any[] = [];
  carteleraService: CarteleraService;
  matdialog: MatDialog;
  salaSeleccionada: number = 0;
  filtroTitulo:string = "";
  
  nomUsuario: string | null = sessionStorage.getItem('nomUsuario');

  filtro: any = {
    titulo: null,
    idGenero : null,
    idSala : null
  }

  constructor(carteleraService: CarteleraService, private router: Router, matdialog: MatDialog) {
    this.carteleraService = carteleraService;
    this.matdialog = matdialog;
  }
  ngOnInit(): void {
    // Initialization logic can go here
    this.getPeliculasXSala();
    this.getGeneros();
    this.getSalas();
  }

  getGeneros(){
    this.carteleraService.getGeneros().subscribe((res)=>{
      this.filtroGeneros = res;
      console.log(this.filtroGeneros);
    });
  }

  getSalas(){
    this.carteleraService.getSalas().subscribe((res)=>{
      this.filtroSalas = res;
    });
  }
  

  getPeliculasXSala(){
    this.cargando = true;
    // Call the service method to get the movies by room
    if(this.generoSeleccionado != 0){
      this.filtro.idGenero = this.generoSeleccionado
    }else{this.filtro.idGenero = null}
    if(this.salaSeleccionada != 0){
      this.filtro.idSala = this.salaSeleccionada
    }else{this.filtro.idSala = null}
    if(this.filtroTitulo != ""){
      this.filtro.titulo = this.filtroTitulo
    }else{this.filtro.titulo = null}
    this.carteleraService.getPeliculas(this.filtro).subscribe(
      (data) => {
        this.cartelera = data;
        // Extract unique genres from the movies
        this.generos = Array.from(new Set(data.flatMap(pelicula => pelicula.generos)));
        this.cargando = false;
      },
      error => {
        this.error = "Error fetching movies";
      }
    );
  }

  detallePelicula(pelicula: any) {
    this.router.navigate([`/pelicula/${pelicula.id}`]);
  }

  abrirLogin(){
    this.matdialog.open(ModalLoginComponent,{});
  }
}