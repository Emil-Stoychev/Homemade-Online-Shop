import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserLogin, IUserRegister } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private URL: string = 'http://localhost:3030/users/';

  constructor(private http: HttpClient) {}

  login(userData: object): Observable<IUserLogin[]> {
    return this.http.post<IUserLogin[]>(this.URL + 'login', userData);
  }

  register(userData: object): Observable<IUserRegister[]> {
    return this.http.post<IUserRegister[]>(this.URL + 'register', userData);
  }

  loggedIn() {
    return !!localStorage.getItem('sessionStorage')
  }

  getToken() {
    return localStorage.getItem('sessionStorage')
  }

}
