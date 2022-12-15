import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProfile, IUserLogin, IUserRegister } from '../interfaces/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  jwt = new JwtHelperService();
  public profile: any;

  private URL: string = `${window.location.protocol}//${window.location.hostname}:3030/users/`

  constructor(private http: HttpClient) { }

  login(userData: object): Observable<IUserLogin[]> {
    return this.http.post<IUserLogin[]>(this.URL + 'login', userData);
  }

  register(userData: object): Observable<IUserRegister[]> {
    return this.http.post<IUserRegister[]>(this.URL + 'register', userData);
  }

  getProfile(token: string) {
    return this.http.get(this.URL + this.jwtDecode(token)?._id);
  }

  checkUserToken(token: any) {
    return this.http.get(this.URL + 'checkUserToken/' + token);
  }

  changePicture(data: any) {
    return this.http.put(this.URL + 'changePicture/' + data?.cookie?._id, data);
  }

  deleteProfile(id: string, data: any) {
    return this.http.delete(this.URL + 'deleteAccount/' + id, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  getAllMessages(userId: string) {
    return this.http.get(this.URL + 'messages/' + userId);
  }

  updateMessageStatus(userId: string, data: any) {
    return this.http.put(this.URL + 'messages/' + userId + '/changeStatus', data)
  }

  loggedIn() {
    return !!localStorage.getItem('sessionStorage');
  }

  getToken() {
    return localStorage.getItem('sessionStorage');
  }

  jwtDecode(token: string) {
    let user = this.jwt.decodeToken(token);

    return user;
  }
}
