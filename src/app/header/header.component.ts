import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ShoppingCartService} from "../shopping-cart/shopping-cart.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  amount_products_shoppingCart: number = 0;

  constructor(private shoppingCartService: ShoppingCartService) { }

  //
  ngOnInit(): void {
    this.subscription = this.shoppingCartService.shoppingCartAmount.subscribe((amount) => {
      this.amount_products_shoppingCart = amount;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
