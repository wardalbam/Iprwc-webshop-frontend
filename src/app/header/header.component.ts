import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ShoppingCartService} from "../shopping-cart/shopping-cart.service";
import {Subscription} from "rxjs";
import {UsersService} from "../users/users.service";
import {User} from "../shared/User.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  amount_products_shoppingCart: number = 0;
  isLoggedInSubscription : Subscription;
  userName: string = this.userService.getUsername();
  isLoggedIn: boolean;
  constructor(private shoppingCartService: ShoppingCartService, private userService:UsersService) {

  }

  ngOnInit(): void {
    this.subscription = this.shoppingCartService.shoppingCartAmount.subscribe((amount) => {
      this.amount_products_shoppingCart = amount;
    });
    this.isLoggedInSubscription = this.userService.loggedIn.subscribe((LoggedIn) => {
      this.isLoggedIn = LoggedIn;
    });
    if(this.userService.isLoggedIn()){
      this.isLoggedIn = true;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  logout(){
    this.isLoggedIn = false;
    this.userService.setLoggedOut();
  }

}
