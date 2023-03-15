import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Product} from "../shared/Product.model";
import {UsersService} from "../users/users.service";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = `${environment.APIEndpoint}`;
  constructor(private http : HttpClient, private userService : UsersService) { }

  uploadProduct(productData: any){
    const params = new HttpParams()
    .set("product", productData);
    const token = this.userService.getToken();
    let options = {
      headers: new HttpHeaders()
      .set('Authorization', 'Bearer ' + token)
        .set('Content-Type', 'application/json')
    }
    return this.http.post<any>( this.baseUrl+"/api/product/add",productData, options);
  }

  // edit existing product
  editProduct(productData: string, form : any){
    const token = this.userService.getToken();
    let options = {
      headers: new HttpHeaders()
      .set
      ('Authorization', 'Bearer ' + token)
        .set('Content-Type', 'application/json')
    }
    return this.http.post<any>( this.baseUrl+"/api/product/edit",{
      "id": productData,
      "newProductForm": form,
    }, options);

  }





  getAllUsersAsAdmin(){
    const token = this.userService.getToken();
    let options = {
      headers: new HttpHeaders()
      .set('Authorization', 'Bearer ' + token)
      .set('Content-Type', 'application/json')
    };
    console.log(token);
    return this.http.get<any>( 
      this.baseUrl+"/api/user/all", options);
  }

  getAllUsersAsManager(){
    const token = this.userService.getToken();
    let options = {
      headers: new HttpHeaders()
      .set('Authorization', 'Bearer ' + token)
      .set('Content-Type', 'application/json')
    };
    console.log(token);
    return this.http.get<any>( 
      this.baseUrl+"/api/user/all/roleuser", options);
      
  }


  // In case ROLE_USER => Get all Orders from the specefic user sending the request
  // in case that the user has role admin or manager => return all the orders from all the users 
  public getAllOrders(){
    const token = this.userService.getToken();
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
        .set('Content-Type', 'application/json')
    }
    return this.http.get<any>( this.baseUrl+"/order/all", options);
  }

  // update order status
  public updateOrderStatus(orderId: string, orderStatus: string){
    const params = new HttpParams()
    .set('status', orderStatus)
    .set('orderId', orderId)
    
    const token = this.userService.getToken();
    let options = {
      headers: new HttpHeaders()
      .set('Authorization', 'Bearer ' + token)
      .set('Content-Type', 'application/json'),
      params:params
    }
    return this.http.put<any>( `${environment.APIEndpoint}/order/status`,{}, options);
  }

  // get order details
  public getOrderDetails(orderId: string){
    const token = this.userService.getToken();
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
        .set('Content-Type', 'application/json')
    }
    return this.http.get<any>( `${environment.APIEndpoint}/order/`+orderId, options);
  }

  // remove user by id
  public removeUserById(userId: string){
    const token = this.userService.getToken();
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
        .set('Content-Type', 'application/json')
    }
    return this.http.delete<any>( `${environment.APIEndpoint}/api/user/delete/`+userId, options );
  }

  // remove product by id
  public removeProduct(productId: string){
    const token = this.userService.getToken();
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
        .set('Content-Type', 'application/json')
    }
    return this.http.delete<any>( `${environment.APIEndpoint}/api/user/delete/`+productId, options)
  }

}
