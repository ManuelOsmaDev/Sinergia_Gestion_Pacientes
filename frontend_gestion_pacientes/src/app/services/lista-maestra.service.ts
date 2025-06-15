import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListaMaestraService {
private apiUrl = `${environment.apiUrl}/listas`;

    constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getDepartamentos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/departamentos`, {
      headers: this.getHeaders()
    });
  }

  getMunicipios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/municipios`, {
      headers: this.getHeaders()
    });
  }

  getGeneros(): Observable<any> {
    return this.http.get(`${this.apiUrl}/generos`, {
      headers: this.getHeaders()
    });
  }

  getTiposDocumento(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tipos-documento`, {
      headers: this.getHeaders()
    });
  }

}
