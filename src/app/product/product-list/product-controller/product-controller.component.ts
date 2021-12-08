import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {Product} from "../../../shared/Product.model";
import {ProductService} from "../../product.service";
import {ShoppingCartService} from "../../../shopping-cart/shopping-cart.service";

@Component({
  selector: 'app-product-controller',
  templateUrl: './product-controller.component.html',
  styleUrls: ['./product-controller.component.css']
})
export class ProductControllerComponent implements OnInit {
  @Input() product: Product;
  amount_product : number = 0;
  userWantsToAddProduct = new EventEmitter<Product>();
  constructor(private shoppingCart: ShoppingCartService ) { }

  ngOnInit(): void {
  }
  addProduct(){
    this.shoppingCart.addCartLine(this.product);
  }
  removeProduct(){
    this.amount_product--;
  }
}
