import { Injectable } from '@angular/core';
import {Product} from "../shared/Product.model";
import {HttpClient} from "@angular/common/http";
import {error} from "@angular/compiler/src/util";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // productenList: Product[] = [
  //   new Product("1","first Product", 20,"https://5.imimg.com/data5/FJ/GS/MY-2101395/bullet-crosshatch-t-shirt-500x500.jpg", "een goed product beschrijving"),
  //   new Product("2","D.A.R.E. T-shirt", 30,"https://upload.wikimedia.org/wikipedia/commons/4/45/Dare_tshirt.png", "een goed product beschrijving"),
  //   new Product("3","Metal-Kids - Crosshorns", 30,"https://www.large.nl/dw/image/v2/BBQV_PRD/on/demandware.static/-/Sites-master-emp/default/dw0b1bf9ab/images/5/1/5/7/515766a.jpg?sfrm=png", "Artikelnr.\n" +
  //     "515766\n" +
  //     "Kleur\n" +
  //     "zwart\n" +
  //     "Muziekgenre\n" +
  //     "Thrash Metal\n" +
  //     "Patroon\n" +
  //     "effen\n" +
  //     "Buitenmateriaal\n" +
  //     "100% organisch katoen\n" +
  //     "Artikelonderwerp\n" +
  //     "Band merch, Bands, Duurzaamheid\n" +
  //     "Verzorgingsinstructies\n" +
  //     "Machinewasbaar\n" +
  //     "Band\n" +
  //     "Metallica\n" +
  //     "Producttype\n" +
  //     "T-shirt\n" +
  //     "Releasedatum\n" +
  //     "12-11-2021\n" +
  //     "Geslacht\n" +
  //     "Jongens & meisjes"),
  //   new Product("4","second Product", 30,"https://5.imimg.com/data5/FJ/GS/MY-2101395/bullet-crosshatch-t-shirt-500x500.jpg", "een goed product beschrijving")
  // ]
  productenList : Product[] = [];
  constructor(private http: HttpClient) {
    this.http.get<Product[]>(`http://localhost:8080/api/prodcut/all`).subscribe(
      (data) => {
        this.productenList = data;
        console.log(data);
      },(error) => {
        console.log(error);
      });
  }

  getAllProducts(){
    return this.http.get<Product[]>(`http://localhost:8080/api/product/all`);
  }
  getProduct(id: String){
    return this.productenList.find(element => element.id === id);
  }


}
