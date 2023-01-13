import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Product} from "../shared/Product.model";
import {UsersService} from "../users/users.service";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = `http://127.0.0.1:8080/api`;
  constructor(private http : HttpClient, private userService : UsersService) { }

  // uploadProduct(productData: Product){
  //   console.log(productData);
  //   const params = new HttpParams()
  //     .set('name', productData['product-name'])
  //     .set('price', productData["product-price"])
  //       .set('description' ,productData["product-description"] )
  //       .set('imageUrl' , productData["product-img-url"]);
  //
  //   return this.http.post<any>( this.baseUrl +
  //     "?name=" + productData['product-name']+"&"+
  //     "price=" + productData['product-price']+"&"+
  //     "description=" + productData['product-description']+"&"+
  //     "imageUrl=" + productData['product-img-url']
  //     , params);
  // }

  uploadProduct(productData: any){
    // from any to product 
    // let product = new Product(productData.name, productData.price, productData.ImagePath, productData.description, productData.status);
    // console.log(product);
    const params = new HttpParams()
    .set("product", productData);

    const token = this.userService.getToken();
    let options = {
      headers: new HttpHeaders()
      .set('Authorization', 'Bearer ' + token)
        .set('Content-Type', 'application/json')
    }
    return this.http.post<any>( this.baseUrl+"/product/add",productData, options);
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
    return this.http.post<any>( this.baseUrl+"/product/edit",{
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
      "http://127.0.0.1:8080/api/user/all", options);
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
      "http://127.0.0.1:8080/api/user/all/roleuser", options);
      
  }



  public getAllOrders(){
    const token = this.userService.getToken();
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
        .set('Content-Type', 'application/json')
    }
    return this.http.get<any>( this.baseUrl+"/order/all", options);
  }

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
    return this.http.get<any>( "http://127.0.0.1:8080/order/"+orderId, options);
  }

  // remove user by id
  public removeUserById(userId: string){
    const token = this.userService.getToken();
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
        .set('Content-Type', 'application/json')
    }
    return this.http.delete<any>( "http://127.0.0.1:8080/api/user/delete/"+userId, options );
  }


  // remove product by id
  public removeProductById(productId: string){
    const token = this.userService.getToken();
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
        .set('Content-Type', 'application/json')
    }
    return this.http.delete<any>( "http://127.0.0.1:8080/api/user/delete/"+productId, options)
  }

}
