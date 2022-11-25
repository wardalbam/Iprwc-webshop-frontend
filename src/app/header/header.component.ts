import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ShoppingCartService} from "../shopping-cart/shopping-cart.service";
import {Subscription} from "rxjs";
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  amount_products_shoppingCart: number = 0;
  loggedIn : boolean = false; 
  authOptionsSubscription: Subscription;
  constructor(private shoppingCartService: ShoppingCartService, private usersService: UsersService) { }

  //
  ngOnInit(): void {
    this.subscription = this.shoppingCartService.shoppingCartAmount.subscribe((amount) => {
      this.amount_products_shoppingCart = amount;
    });

    // this.authOptionsSubscription = this.usersService.loggedIn.subscribe((userIsActive) => {
    //   this.loggedIn = userIsActive;
    // });
    if(this.usersService.isLoggedIn && this.usersService.isAuthenticated){
      this.loggedIn = true;
    }else{
      this.loggedIn = false;
    }

    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  onLogOut(){
    this.usersService.setLoggedOut();
    this.loggedIn = false;
  }
}
