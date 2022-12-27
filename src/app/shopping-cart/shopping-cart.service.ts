import {Injectable, OnInit} from '@angular/core';
import {ShoppingCartModel} from "./shopping-cart-model";
import {Product} from "../shared/Product.model";
import {ShoppingCartLineModel} from "./shopping-cart-line.model";
import {Subject} from "rxjs";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  public shoppingCartAmount: Subject<number> = new Subject<number>();
  public shoppingCart : ShoppingCartModel = new ShoppingCartModel([]);

  constructor(private cookieService: CookieService) {
    // this.syncCartWithCookie();
    // this.shoppingCart = JSON.parse(this.cookieService.get("ShoppingCart"));
    console.log(this.cookieService.get("ShoppingCart") + "1");
    console.log(  this.shoppingCart);

    if(this.cookieService.get("ShoppingCart")){
        this.shoppingCart = JSON.parse(this.cookieService.get("ShoppingCart"));
    } else{
      this.cookieService.set("ShoppingCart", JSON.stringify( new ShoppingCartModel([]) ) );
    }
   }

  getAllCartLines(){
    // return JSON.parse(this.cookieService.get("ShoppingCart"))
    return this.shoppingCart;
  }

  addProductToCart(product : Product){
    if( this.findProductInShoppingCart(product) ){
      this.findProductInShoppingCart(product).amount++ ;
    }else{
      this.shoppingCart.shoppingCartLineList.push(new ShoppingCartLineModel(product, 1));
    }
    this.shoppingCartAmount.next(this.getTotalAmountProducts());
    this.syncCartWithCookie();
  }

  addProductToCartInBulk(product : Product, amount : number){
    if( this.findProductInShoppingCart(product) ){
      this.findProductInShoppingCart(product).amount += amount ;
    }else{
      this.shoppingCart.shoppingCartLineList.push(new ShoppingCartLineModel(product, amount));
    }
    this.shoppingCartAmount.next(this.getTotalAmountProducts());
    this.syncCartWithCookie();
  }


  removeProductFromCart(product : Product){
    if(this.findProductInShoppingCart(product)){
      if( this.getProductAmountInCart(product) === 1 ){
        this.shoppingCart.shoppingCartLineList.splice( this.shoppingCart.shoppingCartLineList.findIndex(shoppingCartLine => shoppingCartLine.product.id == product.id) , 1);
      }else{
        this.shoppingCart.shoppingCartLineList.find(shoppingCartLine => shoppingCartLine.product === product).amount--;
      }
    }
    this.shoppingCartAmount.next(this.getTotalAmountProducts());
    this.syncCartWithCookie();
  }

  getTotalAmountProducts(){
    this.syncCartWithCookie();
    let counter: number = 0;
    this.shoppingCart.shoppingCartLineList.forEach(shoppingCartLine => {
      counter += shoppingCartLine.amount;
    })
    return counter;
  }

  public findProductInShoppingCart(product : Product){
    if( this.shoppingCart.shoppingCartLineList.find(shoppingCartLine => shoppingCartLine.product.id === product.id) !== null ){
      return this.shoppingCart.shoppingCartLineList.find(shoppingCartLine => shoppingCartLine.product.id === product.id);
    }
  }

  public getProductAmountInCart(product : Product){
    this.syncCartWithCookie();
    if(this.findProductInShoppingCart(product)){
      // return JSON.parse(this.cookieService.get("ShoppingCart")).shoppingCartLineList.find(shoppingCartLine => shoppingCartLine.product === product).amount;
      return this.shoppingCart.shoppingCartLineList.find(shoppingCartLine => shoppingCartLine.product === product).amount;
    }else{
      return 0;
    }
  }

  public syncCartWithCookie(){
    this.cookieService.set("ShoppingCart", JSON.stringify(this.shoppingCart));
  }

  public clearCart(){
    this.shoppingCart = new ShoppingCartModel([]);
    this.shoppingCartAmount.next(this.getTotalAmountProducts());
    this.syncCartWithCookie();
  }

}
