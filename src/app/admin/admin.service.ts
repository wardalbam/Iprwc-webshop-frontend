import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Product} from "../shared/Product.model";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = `http://127.0.0.1:3000/product/add`;
  constructor(private http : HttpClient) { }

  uploadProduct(productData: Product){
    console.log(productData);
    const params = new HttpParams()
      .set('name', productData['product-name'])
      .set('price', productData["product-price"])
        .set('description' ,productData["product-description"] )
        .set('imageUrl' , productData["product-img-url"]);
    return this.http.post<any>( this.baseUrl +
      "?name=" + productData['product-name']+"&"+
      "price=" + productData['product-price']+"&"+
      "description=" + productData['product-description']+"&"+
      "imageUrl=" + productData['product-img-url']
      , params);
  }

}
