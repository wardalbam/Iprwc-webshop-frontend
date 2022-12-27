import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HeaderComponent } from '../header/header.component';
import { Address } from '../shared/Address.model';
import { Order } from '../shared/order.model';
import { User } from '../shared/User.model';
import { UserDetails } from '../shared/UserDetails.model';
import { ShoppingCartLineModel } from '../shopping-cart/shopping-cart-line.model';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  userDetails: UserDetails;
  orders: any[];
  userRole: string;
  orderProductsList: ShoppingCartLineModel[];
  constructor(private userService: UsersService, private routes : Router, private cookieService: CookieService) { 

  }
  
  ngOnInit(): void {
    this.userRole = this.cookieService.get('auth-role');
    this.userService.getUserDetails().subscribe(
      data => {
        console.log(data);
        this.userDetails = data;
    },
    error =>{
      // if error.status = 403
      if(error.status = 403){
        this.routes.navigate(["./login"]);
        this.userService.logout();
      }
      
    });

    this.userService.getOrderListByUser().subscribe(
      data => {
        console.log(data);
        this.orders = data;
        this.orderProductsList = data["orederLines"];
    });

  }
  
}
