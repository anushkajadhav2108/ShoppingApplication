import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrls } from '../apiUrl';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

//http = inject(HttpClient);

  constructor(private http: HttpClient) { }

  registerService(registerObj: any){
    // return this.http.post("http://localhost:3000/customer/register",registerObj);
    return this.http.post(`${apiUrls.authUrl}register`, registerObj)
  }

  loginService(loginObj: any){
    return this.http.post(`${apiUrls.authUrl}login`,loginObj);
  }
}
