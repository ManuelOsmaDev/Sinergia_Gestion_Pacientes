import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthResponse } from '../pages/interfaces/AuthResponseModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/login`;

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('nombre_usuario', response.user);
        }
      })
    );
  }

  register(data: any): Observable<AuthResponse> {
  return this.http.post<AuthResponse>(`${environment.apiUrl}/register`, data).pipe(
    tap((response) => {
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
    })
  );
}



  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
