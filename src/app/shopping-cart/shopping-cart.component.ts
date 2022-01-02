import { Component, OnInit } from '@angular/core';
import {ShoppingCartLineModel} from "./shopping-cart-line.model";
import {ShoppingCartService} from "./shopping-cart.service";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  productRowList : ShoppingCartLineModel[];
  totalAmountProducts : number;
  constructor(public shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.totalAmountProducts = this.shoppingCartService.getTotalAmountProducts();
    this.productRowList = this.shoppingCartService.getAllCartLines().shoppingCartLineList;
  }

}
