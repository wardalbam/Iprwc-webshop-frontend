import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  isLoggedIn = true;
  registerUserUrl = `http://127.0.0.1:3000/registerUser`;
  loginUserUrl = `http://127.0.0.1:3000/loginUser`;
  constructor(private http : HttpClient) { }

  RegisterUser(user){
    return this.http.post<any>( this.registerUserUrl, user);
  }

  loginUser(user){
    return this.http.post<any>( this.loginUserUrl, user);
  }

}
