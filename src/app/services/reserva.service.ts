import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private apiUrl = environment.apiUrl + '/Cine';

  constructor(private http: HttpClient) { }

  realizarReserva(reservaData: any) {
    const token = localStorage.getItem('token');
    return this.http.post(`${this.apiUrl}/reservas`, reservaData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
