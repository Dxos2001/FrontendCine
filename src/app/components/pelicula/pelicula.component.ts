import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarteleraService } from '../../services/cartelera.service'; // ajusta si usas otro
import { CommonModule } from '@angular/common';
import { ReservaService } from '../../services/reserva.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalLoginComponent } from '../modal-login/modal-login.component';
import { ModalReservaComponent } from '../modal-reserva/modal-reserva.component';

@Component({
  selector: 'app-pelicula',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {
  pelicula!: any; // o Pelicula
  error: string = '';
  funcionSeleccionada: any;
  cantidadEntradas: number = 1;
  total: number = 0;
  cargando = false;
  

  constructor(
    private route: ActivatedRoute,
    private carteleraService: CarteleraService,
    private reservaService: ReservaService, // Asegúrate de importar y usar el servicio correcto
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const numericId = Number(id);
      if (!isNaN(numericId)) {
        this.carteleraService.getPeliculasPorId(numericId).subscribe({
          next: (data) => {
            this.pelicula = data[0];
          },
          error: () => {
            this.error = 'No se pudo cargar la película.';
          }
        });
      } else {
        this.error = 'ID no es un número válido.';
      }
    } else {
      this.error = 'ID no válido.';
    }
  }

  goBack() {
    window.history.back();
  }

  formatearFecha(fecha: string) {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    };
    return new Date(fecha).toLocaleDateString('es-ES', options);
  }

  seleccionarFuncion(funcion: any) {
    this.funcionSeleccionada = funcion;
    this.cantidadEntradas = 1;
    this.total = funcion.precioEntrada;
    console.log('Función seleccionada:', funcion);
  }

  aumentarCantidad() {
    if (this.funcionSeleccionada) {
      this.cantidadEntradas++;
      this.total = this.cantidadEntradas * this.funcionSeleccionada.precioEntrada;
    }
  }
  disminuirCantidad() {
    if (this.cantidadEntradas > 1) {
      this.cantidadEntradas--;
      this.total = this.cantidadEntradas * this.funcionSeleccionada.precioEntrada;
    }
    if (this.cantidadEntradas === 0) {
      this.cantidadEntradas = 1; // Asegurarse de que la cantidad no sea menor a 1
    }
  }

  crearReserva(){
    this.cargando = true;
    const idClienteGet = localStorage.getItem('idCliente');
    if (!idClienteGet) {
      alert('Por favor, inicia sesión para realizar una reserva.');
      this.cargando = false;
      this.matDialog.open(ModalLoginComponent,{});
      return;
    }
    if (this.funcionSeleccionada) {
      const reserva = {
        idCliente: idClienteGet, // Asegúrate de que este ID esté disponible
        idFuncion: this.funcionSeleccionada.id,
        cantidadAsientos: this.cantidadEntradas,
        precioTotal: this.total
      };
      this.reservaService.realizarReserva(reserva).subscribe({
        next: (response) => {
          this.cargando = false;
          this.matDialog.open(ModalReservaComponent, {
          data: response
          });
          
        },
        error: (error) => {
            if (error.status === 401) {
            alert('Inicia sesión nuevamente.');
            this.cargando = false;
            this.matDialog.open(ModalLoginComponent, {});
            } else {
            console.error('Error al crear la reserva:', error);
            alert('Error al crear la reserva. Inténtalo de nuevo más tarde.');
            }
        }
      });
    } else {
      alert('Por favor, selecciona una función antes de reservar.');
    }
  }
}