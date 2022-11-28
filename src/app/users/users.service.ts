import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Observable, Subject} from "rxjs";
import {User} from "../shared/User.model";
import jwt_decode from 'jwt-decode';
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public user: Observable<User>;
  private REFRESH_TOKEN_KEY = 'auth-refresh-token';
  private ROLE = 'auth-role';
  private USERNAME = 'auth-username';
  public loggedIn: Subject<boolean> = new Subject<false>();
  private LOGGED_IN = 'isLoggedIn';
  private TOKEN_KEY = 'auth-token';

  constructor(private router: Router, private http : HttpClient, private cookieService: CookieService) { }

  RegisterUser(user){
    return this.http.post<any>( `${environment.APIEndpoint}/user/register`, user);
  }

  login(userForm){
    // const params = new HttpParams()
    //   .set('username', userForm['username'])
    //   .set('password', userForm['password']);
    // return this.http.post<any>( `${environment.APIEndpoint}/login`, params);

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    let body = new URLSearchParams();
    body.set('username', userForm['username']);
    body.set('password', userForm['password']);
    return this.http.post<any>(`${environment.APIEndpoint}/login`, body.toString(), options)

  }
  registerUser(registerForm){
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    let body = new URLSearchParams();
    body.set('username', registerForm['username']);
    body.set('name', registerForm['name']);
    body.set('password', registerForm['password']);
    return this.http.post<any>(`${environment.APIEndpoint}/api/user/register`, body.toString(), options);
  }

  public saveToken(token: string): void {
    this.cookieService.deleteAll('/');
    this.cookieService.deleteAll('/admin');
    this.cookieService.set(this.TOKEN_KEY, token, {secure: true, sameSite: 'Strict', expires: this.getExpiryTime()});
    this.saveRole(token);
    this.saveUsername(token);
  }

  public getToken(): string | null {
    return this.cookieService.get(this.TOKEN_KEY)
  }
  public saveUsername(token: string): void {
    this.cookieService.delete(this.USERNAME);
    this.cookieService.set(this.USERNAME, this.extractUsername(token), {secure: true, sameSite: 'Strict', expires: this.getExpiryTime()})
  }

  public getUsername(): string {
    return this.cookieService.get(this.USERNAME);
  }
  public getUser(): string {
    return this.cookieService.get(this.USERNAME);
  }

  public saveRole(token: string): void {
    this.cookieService.delete(this.ROLE);
    let role: string = this.extractRole(token);
    this.cookieService.set(this.ROLE, role, {secure: true, sameSite: 'Strict', expires: this.getExpiryTime()});
  }

  public extractRole(token: string): string {
    let decoded: any = jwt_decode(token);
    return decoded['roles'][0];
  }

  public extractUsername(token: string): string {
    let decoded: any = jwt_decode(token);
    return decoded['sub'];
  }

  public getRole(): string | null {
    return this.cookieService.get(this.ROLE);
  }

  public setLoggedIn(): void {
    this.loggedIn.next(true) ;
    localStorage.setItem(this.LOGGED_IN, "true");
  }
  public setLoggedOut(): void {
    this.loggedIn.next(false);
    localStorage.clear();
    this.cookieService.deleteAll('/');
    this.cookieService.deleteAll('/admin');
    this.cookieService.deleteAll('../');
    this.cookieService.delete('auth-token');
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem(this.LOGGED_IN)  === "true" ;
  }

  public isAuthenticated(): Promise<boolean> {
    return new Promise(
      (resolve, reject) => {
        if (this.getRole() === 'ROLE_ADMIN' || this.getRole() === 'ROLE_MOD' || this.getRole() === 'ROLE_USER') {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    );
  }

  logout() {
    this.cookieService.deleteAll('/');
    this.cookieService.deleteAll('/admin');

    this.setLoggedOut();
  }

  public getExpiryTime(): Date {
    const date = new Date();
    date.setHours(date.getHours() + 1);
    return date;
  }

  public checkToken(token: string) {
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    }
    this.http.post(`${environment.APIEndpoint}/api/v1/users/checktoken`, null , options).subscribe({
      next: (data: any) => {
        if (data.status === 200 && this.isLoggedIn()) {
          this.setLoggedIn();
          return;
        }
        this.setLoggedOut();
      },
      error: err => {
        console.log(err);
      }
    })
  }

  public getCookieInfo(): void {
    if (this.getToken() !== "" || this.isLoggedIn()) {
      this.checkToken(this.getToken()!);
    }
  }

  public delete(id: string) {
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.getToken())
    }
    return this.http.delete(`${environment.APIEndpoint}/api/v1/users/${id}`, options);
  }
}
