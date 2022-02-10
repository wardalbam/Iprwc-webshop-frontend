import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Product} from "../shared/Product.model";
import {UsersService} from "../users/users.service";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = `http://127.0.0.1:8080/product/add`;
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

  uploadProduct(productData: Product){

    console.log(productData);
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin" : "*",
    "Access-Control-Allow-Methods" : "POST,GET,PUT,DELETE",
    "Access-Control-Allow-Headers" : "Authorization, Lang"
    });
    return this.http.post<any>( this.baseUrl, productData, {
      headers
    });
  }

  getAllUsers(){
    const token = this.userService.getToken();
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
        .set('Content-Type', 'application/json')
    }
    return this.http.get<any>( "http://127.0.0.1:8080/api/users" , options);
  }

}
