import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-modal-reserva',
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-reserva.component.html',
  styleUrl: './modal-reserva.component.css'
})
export class ModalReservaComponent implements OnInit {
  dataReserva: any;

constructor(
  public matdialogRef: MatDialogRef<ModalReservaComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any
) {}

  ngOnInit(): void {
    this.dataReserva = this.data;
  }

 async imprimirReserva() {
  window.print();
  }
}
