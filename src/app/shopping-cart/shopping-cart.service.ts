import {Injectable, OnInit} from '@angular/core';
import {ShoppingCartModel} from "./shopping-cart-model";
import {Product} from "../shared/Product.model";
import {ShoppingCartLineModel} from "./shopping-cart-line.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService{
  public shoppingCartAmount: Subject<number> = new Subject<number>();
  public shoppingCart : ShoppingCartModel = new ShoppingCartModel([]);

  constructor() {  }

  getAllCartLines(){
    return this.shoppingCart;
  }
  removeAllCartLines(){

  }
  addProductToCart(product : Product){
    if(this.shoppingCart.shoppingCartLineList.find(shoppingCartLine => shoppingCartLine.product === product)){
      this.shoppingCart.shoppingCartLineList.find(shoppingCartLine => shoppingCartLine.product === product).amount++;
    }else{
      this.shoppingCart.shoppingCartLineList.push(new ShoppingCartLineModel(product, 1));
    }
    this.shoppingCartAmount.next(this.getTotalAmountProducts());
  }
  removeProductFromCart(product : Product){
    if(this.shoppingCart.shoppingCartLineList.find(shoppingCartLine => shoppingCartLine.product === product)){
      // this is not working !!!!!!!!
      if(this.shoppingCart.shoppingCartLineList.find(shoppingCartLine => shoppingCartLine.product === product).amount === 1){
      //  remove from the list
        delete this.shoppingCart.shoppingCartLineList[ this.shoppingCart.shoppingCartLineList.findIndex(shoppingCartLine => shoppingCartLine.product == product) ];
      }else{
        this.shoppingCart.shoppingCartLineList.find(shoppingCartLine => shoppingCartLine.product === product).amount--;
      }
    }
    this.shoppingCartAmount.next(this.getTotalAmountProducts());
  }
  getTotalAmountProducts(){
    let counter: number = 0;
    this.shoppingCart.shoppingCartLineList.forEach(shoppingCartLine => {
      counter += shoppingCartLine.amount;
    })
    return counter;
  }

}
