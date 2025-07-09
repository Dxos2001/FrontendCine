import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  //private apiUrl = environment.apiUrl + '/Cine';
  private apiUrl = environment.apiUrl + '/cine';

  constructor(private http: HttpClient) { }

  realizarReserva(reservaData: any) {
    const token = sessionStorage.getItem('token');
    //return this.http.post(`${this.apiUrl}/reservas`, reservaData, {
    return this.http.post(`${this.apiUrl}/Reservas`, reservaData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
