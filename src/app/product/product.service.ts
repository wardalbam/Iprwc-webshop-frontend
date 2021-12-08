import { Injectable } from '@angular/core';
import {Product} from "../shared/Product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productenList: Product[] = [
    new Product("1","first Product", 20,"https://5.imimg.com/data5/FJ/GS/MY-2101395/bullet-crosshatch-t-shirt-500x500.jpg", "een goed product beschrijving"),
    new Product("2","second Product", 30,"https://5.imimg.com/data5/FJ/GS/MY-2101395/bullet-crosshatch-t-shirt-500x500.jpg", "een goed product beschrijving"),
    new Product("3","second Product", 30,"https://5.imimg.com/data5/FJ/GS/MY-2101395/bullet-crosshatch-t-shirt-500x500.jpg", "een goed product beschrijving"),
    new Product("4","second Product", 30,"https://5.imimg.com/data5/FJ/GS/MY-2101395/bullet-crosshatch-t-shirt-500x500.jpg", "een goed product beschrijving")
  ]
  constructor() { }
  getAllProducts(){
    return this.productenList;
  }
  getProduct(id: String){
    return this.productenList.find(element => element.id === id);
  }

}
