import { Component, OnInit } from '@angular/core';
import {generate, Subscription} from "rxjs";
import {UsersService} from "../users/users.service";
import {Form, FormBuilder, NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {ShoppingCartService} from "../shopping-cart/shopping-cart.service";
import {ShoppingCartLineModel} from "../shopping-cart/shopping-cart-line.model";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Order } from '../shared/order.model';
import { ShoppingCartModel } from '../shopping-cart/shopping-cart-model';
import { Address } from '../shared/Address.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {


  productRowList : ShoppingCartLineModel[];
  totalAmountProducts : number;
  isLoggedInSubscription : Subscription;
  user: any;
  isLoggedIn: boolean;
  token:string;
  loginError: boolean;
  formError: boolean = false;
  guest : boolean = false;
  OrderPlaced : boolean = false;
  PlacedOrder : Order;
  errorMessage : string = "something went wrong please try again later!";

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


  onSubmit( shippingaddress: NgForm ) {
    
    const productLineList  = this.shoppingCartService.getAllCartLines().shoppingCartLineList;
    const address = shippingaddress.value;
    const order = {
      productLineList,
      address
    };
    
    console.log(order);
    this.userService.placeOrder(order).subscribe(
      data => {
        this.PlacedOrder = data;
        this.OrderPlaced = true;
        this.shoppingCartService.clearCart();
        this.formError = false;
        this.router.navigate(["./order-success"]);
      }, error => {
        this.formError = true;
        console.log(error);
      }
    )
  }

  resetFormValue(myForm: NgForm){
    myForm.resetForm();
  }

}
