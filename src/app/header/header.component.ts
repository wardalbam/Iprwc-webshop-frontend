import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ShoppingCartService} from "../shopping-cart/shopping-cart.service";
import {Subscription} from "rxjs";
import {UsersService} from "../users/users.service";
import {User} from "../shared/User.model";
import { CookieService } from 'ngx-cookie-service';
import { ShoppingCartModel } from '../shopping-cart/shopping-cart-model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  amount_products_shoppingCart: number;
  isLoggedInSubscription : Subscription;
  getUserNameSub: Subscription;
  userName: User; 
  isLoggedIn: boolean ;

  userRoleSub:  Subscription;
  userRole: String;
  private LOGGED_IN = 'isLoggedIn';
  private USERNAME = 'auth-username';
  constructor( private shoppingCartService: ShoppingCartService, private userService:UsersService, private cookieService:CookieService) {
    this.amount_products_shoppingCart =  this.shoppingCartService.getTotalAmountProducts();
   
  }

  ngOnInit(): void {
    this.subscription = this.shoppingCartService.shoppingCartAmount.subscribe((amount) => {
      this.amount_products_shoppingCart = amount;
    });
    
    this.isLoggedInSubscription = this.userService.loggedIn.subscribe((LoggedIn) => {
      this.isLoggedIn = LoggedIn;
    });

    this.isLoggedIn = (localStorage.getItem(this.LOGGED_IN)  === "true");
    this.userRole = this.cookieService.get('auth-role');
    this.userRoleSub = this.userService.UserRole.subscribe((role) => {
      this.userRole = role;
    });
    
    console.log(this.userRole);
    this.getUserNameSub =  this.userService.user.subscribe((username) => {
      this.userName = username;
    }
    );    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  logout(){
    console.log(this.userRole);
    this.isLoggedIn = false;
    this.userService.setLoggedOut();
    this.updateUserName();
  }
  // for later show user name in header
  updateUserName(){
    this.userName = this.cookieService.get(this.USERNAME);
  }


}
