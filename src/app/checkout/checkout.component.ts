import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {UsersService} from "../users/users.service";
import {User} from "../shared/User.model";
import {FormBuilder, NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {ShoppingCartService} from "../shopping-cart/shopping-cart.service";
import {ShoppingCartLineModel} from "../shopping-cart/shopping-cart-line.model";
import 'bootstrap/dist/css/bootstrap.min.css';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  productRowList : ShoppingCartLineModel[];
  totalAmountProducts : number;
  isLoggedInSubscription : Subscription;
  user: any;
  isLoggedIn: boolean;
  token:string;
  loginError: boolean;
  guest : boolean = false;
  constructor(private userService : UsersService, private router : Router, public shoppingCartService: ShoppingCartService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.user = this.userService.user;
    this.isLoggedInSubscription = this.userService.loggedIn.subscribe((LoggedIn) => {
      this.isLoggedIn = LoggedIn;
    });
    if(this.userService.isLoggedIn()){
      this.isLoggedIn = true;
    }
    this.totalAmountProducts = this.shoppingCartService.getTotalAmountProducts();
    this.productRowList = this.shoppingCartService.getAllCartLines().shoppingCartLineList;
  }

  onSubmitLogin(form: NgForm){
    this.userService.login(form.value).subscribe(
      (data) => {
        this.userService.saveToken(data.access_token);
        this.loginError = false;
        this.userService.setLoggedIn();
        this.router.navigate(['/'])
        this.token = data;
        form.resetForm();
      },
      (error) => {
        this.token = null;
      }
    )
  }


  onSubmit(): void {
    // Process checkout data here
    this.shoppingCartService.shoppingCart.shoppingCartLineList = [];
    console.warn('Your order has been submitted');

  }

}
