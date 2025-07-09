import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-modal-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-login.component.html',
  styleUrl: './modal-login.component.css'
})
export class ModalLoginComponent {

  activeTab: 'login' | 'register' = 'login';
  isLoading: boolean = false;

  classLogin: any = {
    nomUsuario: '',
    password: ''
  };

  classRegisterCliente: any = {
    usuario_creacion : 1,
    fecha_creacion : new Date(),
    documento :'',
    nombre : '',
    apellido : '',
    fechaNacimiento : new Date(),
    genero: 0,
    estado : 'Habilitado'
  };

  classRegister: any = {
    usuario_creacion : 1,
    fecha_creacion : new Date(),
    password : '',
    email : '',
    nomUsuario : '',
    cliente : this.classRegisterCliente
  };

  loginService: LoginService;
  constructor(public matdialogRef: MatDialogRef<ModalLoginComponent>, loginService: LoginService) {
    // Inicializar el servicio de login
    this.loginService = loginService;
  }
  setActiveTab(tab: 'login' | 'register') {
    this.activeTab = tab;
  }
  closeDialog() {
    this.matdialogRef.close();
  }

  login(){
    this.isLoading = true;
    console.log('Datos de login:', this.loginService.classLogin);
    this.loginService.login(this.classLogin.nomUsuario, this.classLogin.password).subscribe({
    next: (res: any) => {
          console.log('Login exitoso:', res);
          const { token, user: {idCliente, nomUsuario} } = res;
          localStorage.setItem('token', token);
          sessionStorage.setItem('idCliente', idCliente);
          sessionStorage.setItem('nomUsuario', nomUsuario);
          this.isLoading = false;
          this.closeDialog();
        },
      error: (error) => {
        console.error('Error en el login:', error);
        this.isLoading = false;
      }
    });
  }

  registrar(){
    this.isLoading = true;
    this.classRegister.nomUsuario = this.classRegister.email;
    console.log('Datos de registro:', this.classRegister);
    this.loginService.register(this.classRegister).subscribe({
      next: (response) => {
        console.log('Registro exitoso:', response);
        this.isLoading = false;
        this.closeDialog();
      },
      error: (error) => {
        console.error('Error en el registro:', error);
        this.isLoading = false;
      }
    });
  }


}
