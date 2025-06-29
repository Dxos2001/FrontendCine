import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = environment.apiUrl + '/auth';
  constructor(private http: HttpClient) { }

  classLogin: any = {
    nomUsuario: '',
    password: ''
  };
  

  login(nomUsuario: string, password: string) {
    this.classLogin.nomUsuario = nomUsuario;
    this.classLogin.password = password;
    return this.http.post(`${this.apiUrl}/login`, this.classLogin);
  }

  register(classRegister: any) {
    return this.http.post(`${this.apiUrl}/register`, classRegister);
  }
}
