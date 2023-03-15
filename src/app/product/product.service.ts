import { Injectable } from '@angular/core';
import {Product} from "../shared/Product.model";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {error} from "@angular/compiler/src/util";
import { UsersService } from '../users/users.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = `${environment.APIEndpoint}`;
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
    return this.http.get<Product[]>( this.baseUrl+`/api/product/all`);
  }
  getAllAdminProducts(){
    // add token to header
    const token = this.userService.getToken();
    let options = {
      headers: new HttpHeaders()
        .set
        ('Authorization', 'Bearer ' + token)
        .set('Content-Type', 'application/json')
    }
    return this.http.get<Product[]>(this.baseUrl+`/api/admin/product/all`, options);
  }

  
  getProduct(id : string){
    const params = new HttpParams()
      .set("id", id);
    return this.http.get<Product>(this.baseUrl+`/api/product/${id}`, {params});
  }

  deleteProduct(id : string){
    const token = this.userService.getToken();
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    }
    return this.http.delete(this.baseUrl+`/api/product/delete/${id}`, options)
  }
}
