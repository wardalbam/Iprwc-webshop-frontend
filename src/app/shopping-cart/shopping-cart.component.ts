import { Component, OnInit } from '@angular/core';
import {Product} from "../shared/Product.model";
import {ShoppingCartLineModel} from "./shopping-cart-line.model";
import {ShoppingCartModel} from "./shopping-cart-model";
import {ShoppingCartService} from "./shopping-cart.service";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  productRowList : ShoppingCartLineModel[] = [
    new ShoppingCartLineModel( new Product("2","D.A.R.E. T-shirt", 30,"https://upload.wikimedia.org/wikipedia/commons/4/45/Dare_tshirt.png", "een goed product beschrijving")
      , 2),
    new ShoppingCartLineModel(new Product("2","D.A.R.E. T-shirt", 30,"https://upload.wikimedia.org/wikipedia/commons/4/45/Dare_tshirt.png", "een goed product beschrijving")
      ,6)
  ];
  totalAmountProducts : number;
  constructor(public shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.totalAmountProducts = this.shoppingCartService.getTotalAmountProducts();
    this.productRowList = this.shoppingCartService.getAllCartLines().shoppingCartLineList;
  }

}
