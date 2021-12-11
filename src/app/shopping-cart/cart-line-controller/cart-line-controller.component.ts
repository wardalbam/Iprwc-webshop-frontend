import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../shared/Product.model";
import {Subscription} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";
import {ShoppingCartService} from "../shopping-cart.service";

@Component({
  selector: 'app-cart-line-controller',
  templateUrl: './cart-line-controller.component.html',
  styleUrls: ['./cart-line-controller.component.css']
})
export class CartLineControllerComponent implements OnInit {

  @Input() product: Product;

  currentRoute: string;
  amount_product : number = 0;
  subscription: Subscription;

  constructor(private shoppingCartService: ShoppingCartService, public router: Router) {}

  ngOnInit(): void {
    this.amount_product = this.shoppingCartService.getProductAmountInCart(this.product);
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
