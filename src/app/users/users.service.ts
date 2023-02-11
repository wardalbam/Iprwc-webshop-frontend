import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Observable, Subject} from "rxjs";
import {User} from "../shared/User.model";
import jwt_decode from 'jwt-decode';
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import { ProductListComponent } from '../product/product-list/product-list.component';
import { Order } from '../shared/order.model';
import { ShoppingCartLineModel } from '../shopping-cart/shopping-cart-line.model';
import { Address } from '../shared/Address.model';
import { UserDetails } from '../shared/UserDetails.model';
import { UserRegisterForm } from '../shared/UserRegisterForm.model';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public user: Subject<User> = new Subject<false>();
  private REFRESH_TOKEN_KEY = 'auth-refresh-token';
  private ROLE = 'auth-role';
  private USERNAME = 'auth-username';
  public loggedIn: Subject<boolean> = new Subject<false>();

  public UserRole: Subject<string> = new Subject<string>();

  private LOGGED_IN = 'isLoggedIn';
  private TOKEN_KEY = 'auth-token';

  constructor(private router: Router, private http : HttpClient, private cookieService: CookieService) {
     if( this.isLoggedIn() ){
        this.user.next(this.getUser());
     }
   }


  login(userForm){
    this.loggedIn.next(false);
    localStorage.setItem(this.LOGGED_IN, "false");
    this.cookieService.deleteAll('/');
    this.cookieService.deleteAll('auth-username');
    this.cookieService.delete('auth-role');
    this.cookieService.delete('auth-token');

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    let body = new URLSearchParams();
    body.set('username', userForm['username']);
    body.set('password', userForm['password']);
    this.user.next(this.getUser());
    return this.http.post<any>(`${environment.APIEndpoint}/login`, body.toString(), options);
    
  }
  registerUser(registerForm : any){
    return this.http.post<any>(`${environment.APIEndpoint}/api/user/save`, registerForm);
  }
  registerManager(registerForm : any){
    // add token to header]
    let options = {
      headers: new HttpHeaders().set
      ('Authorization', 'Bearer ' + this.getToken())
    };
    return this.http.post<any>(`${environment.APIEndpoint}/api/user/save/manager`, registerForm, options);
  }

  public saveToken(token: string): void {
    // this.cookieService.deleteAll('/');
    // this.cookieService.deleteAll('/admin');
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
    this.UserRole.next(role);
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
    this.loggedIn.next(true);
    localStorage.setItem(this.LOGGED_IN, "true");
  }
  public setLoggedOut(): void {
    this.loggedIn.next(false);
    localStorage.setItem(this.LOGGED_IN, "false");
    this.cookieService.deleteAll('auth-username');
    this.cookieService.delete('auth-role');
    this.cookieService.delete('auth-token');
    this.cookieService.deleteAll('/');
    this.cookieService.deleteAll();
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
          this.loggedIn.next(true);
          return;
        }
        this.setLoggedOut();
        this.loggedIn.next(false);
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
  public getUserDetails() {
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.getToken())
    }
    return this.http.get<UserDetails>(`${environment.APIEndpoint}/api/user/details`, options);
  }

  public getUserAddress(addressId : string) {
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.getToken()),
      params : new HttpParams().set("id", addressId)
    };
    return this.http.get<Address>(`${environment.APIEndpoint}/api/address/${addressId}`, options);
  }

  public placeOrder(order : { productLineList: ShoppingCartLineModel[] , address : Address}){
    
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.getToken())
    };
    return this.http.post(`${environment.APIEndpoint}/order`, 
    order,
    options
    );
  }

  public getOrderListByUser(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.getToken())
    }
    return this.http.get<any[]>(`${environment.APIEndpoint}/order/all`, options);
  }

}
