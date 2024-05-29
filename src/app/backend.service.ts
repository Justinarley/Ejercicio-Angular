import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private baseUrl = 'http://localhost:3000'; // Ajusta la URL según la ubicación de tu API

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  createUser(user: User): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<User>(`${this.baseUrl}/users`, user, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  updateUser(id: number, userData: Partial<User>): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<User>(`${this.baseUrl}/users/${id}`, userData, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/users/${id}`);
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      console.error('Error del lado del cliente:', error.error.message);
    } else {
      // El backend devolvió un código de error
      console.error(`Error del backend: ${error.status}, ${error.error}`);
    }
    // Devuelve un observable con un mensaje de error
    return throwError('Error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.');
  }
}
