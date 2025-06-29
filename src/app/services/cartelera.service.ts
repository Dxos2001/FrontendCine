import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarteleraService {

  private apiUrl = environment.apiUrl + '/cartelera'

  constructor(private http: HttpClient) { }

  getPeliculas(param: any) {
    return this.http.post<any[]>(`${this.apiUrl}/GetPeliculaByParam`, param);
  }
  getPeliculasPorId(id: number) {
    return this.http.get<any>(`${this.apiUrl}/PeliculasXSala/${id}`);
  }
  getGeneros(){
    return this.http.get<any[]>(`${this.apiUrl}/Generos`)
  }
  getSalas(){
    return this.http.get<any[]>(`${this.apiUrl}/Salas`)
  }
}
