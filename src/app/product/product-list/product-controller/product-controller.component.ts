import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {Product} from "../../../shared/Product.model";
import {ProductService} from "../../product.service";
import {ShoppingCartService} from "../../../shopping-cart/shopping-cart.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-product-controller',
  templateUrl: './product-controller.component.html',
  styleUrls: ['./product-controller.component.css']
})
export class ProductControllerComponent implements OnInit {
  @Input() product: Product;

  subscription: Subscription;
  amount_product : number = 0;

  constructor(private shoppingCartService: ShoppingCartService ) { }

  ngOnInit(): void {

  }

  addProduct(){
    this.shoppingCartService.addProductToCart(this.product);
    this.amount_product++;
  }
  removeProduct(){
    this.shoppingCartService.removeProductFromCart(this.product);
  }


}
