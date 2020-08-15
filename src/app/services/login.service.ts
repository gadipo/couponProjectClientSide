import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientType } from '../models/client-type.enum';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token: string = sessionStorage.getItem('userId');

  loggedIn: boolean = this.token != null && this.token.length > 10;



  constructor(private client: HttpClient) { }

  login(email: string, password: string, clientType: string) {
    return this.client.get("http://localhost:8080/login/" + email + "/" + password + "/" + clientType, { responseType: 'text' });
  }

  logout() {
    return this.client.get("http://localhost:8080/login/logout/" + this.token, { responseType: 'text' });
  }
}
