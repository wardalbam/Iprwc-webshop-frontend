import {Component, Input, OnInit} from '@angular/core';
import {ShoppingCartModel} from "../shopping-cart/shopping-cart-model";
import {ShoppingCartService} from "../shopping-cart/shopping-cart.service";
import {ShoppingCartLineModel} from "../shopping-cart/shopping-cart-line.model";

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {

  @Input() shoppingCartLineList : ShoppingCartLineModel[];
  constructor(public shoppingCartService:ShoppingCartService) { }

  ngOnInit(): void {
  }
  getTotalPrice(){
    let totalPrice: number = 0;
    this.shoppingCartLineList.forEach(function(item){
      totalPrice += (item.product.price * item.amount);
    });
    return totalPrice;
  }
  getTotalAmountItems(){
    return this.shoppingCartService.getTotalAmountProducts();
  }

}
