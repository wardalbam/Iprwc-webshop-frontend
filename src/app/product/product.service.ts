import { Injectable } from '@angular/core';
import {Product} from "../shared/Product.model";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {error} from "@angular/compiler/src/util";
import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  // productenList : Product[] = [];
  constructor(private http: HttpClient, private userService:UsersService) {
    // this.http.get<Product[]>(`http://127.0.0.1:8080/api/product/all`).subscribe(
    //   (data) => {
    //     this.productenList = data;
    //   },(error) => {
    //     console.log(error);
    //   });
    
  }

  getAllProducts(){
    return this.http.get<Product[]>(`http://127.0.0.1:8080/api/product/all`);
  }
  getAllAdminProducts(){
    return this.http.get<Product[]>(`http://127.0.0.1:8080/api/admin/product/all`);
  }

  
  getProduct(id : string){
    const params = new HttpParams()
      .set("id", id);
    return this.http.get<Product>(`http://127.0.0.1:8080/api/product/${id}`, {params});
  }

}
