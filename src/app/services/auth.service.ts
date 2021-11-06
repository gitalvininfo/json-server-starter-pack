import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = "http://localhost:3000"

  constructor(private http: HttpClient) { }


  registerUser(user): Observable<any> {
    const httpOptions = {
			headers: new HttpHeaders({
			  'Content-Type':  'application/json'
			})
		};
    return this.http.post(`${this.baseUrl}/registration`, user, httpOptions,);
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/registration`)
  }
}
