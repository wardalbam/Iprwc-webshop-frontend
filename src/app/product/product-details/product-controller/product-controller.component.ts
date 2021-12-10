import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {Product} from "../../../shared/Product.model";
import {ShoppingCartService} from "../../../shopping-cart/shopping-cart.service";
import {Subscription} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-product-controller',
  templateUrl: './product-controller.component.html',
  styleUrls: ['./product-controller.component.css']
})
export class ProductControllerComponent implements OnInit {
  @Input() product: Product;

  currentRoute: string;
  amount_product : number = 0;
  subscription: Subscription;

  NavEnd : NavigationEnd;

  constructor(private shoppingCartService: ShoppingCartService, public router: Router) {}

  ngOnInit(): void {

    if( this.shoppingCartService.findProductInShoppingCart(this.product) ){
      this.amount_product = this.shoppingCartService.getProductAmountInCart(this.product);
    }

  }

  addProduct(){
    this.shoppingCartService.addProductToCart(this.product);
    this.amount_product = this.shoppingCartService.findProductInShoppingCart(this.product).amount;
  }
  removeProduct(){
    this.shoppingCartService.removeProductFromCart(this.product);
    if (this.shoppingCartService.findProductInShoppingCart(this.product)) {
      this.amount_product = this.shoppingCartService.findProductInShoppingCart(this.product).amount;
    }else{
      this.amount_product = 0;
    }
  }


}
