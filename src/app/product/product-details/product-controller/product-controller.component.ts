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

  constructor(private shoppingCartService: ShoppingCartService, public router: Router) {}

  ngOnInit(): void {}

  addProduct(){
    if(this.amount_product > 0){
      this.shoppingCartService.addProductToCartInBulk(this.product, this.amount_product);
      this.amount_product = 0;
      // show pop-up
    }
  }

  raiseAmount(){
    this.amount_product++;
  }

  lowerAmount(){
    if(this.amount_product > 0){
      this.amount_product--;
    }
  }

}
