import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Order } from 'src/app/shared/order.model';
import { UsersService } from 'src/app/users/users.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-orders-overview',
  templateUrl: './orders-overview.component.html',
  styleUrls: ['./orders-overview.component.scss']
})
export class OrdersOverviewComponent implements OnInit {

  orders: any[];
  userRole: string;
  showOrderItemsFlag: boolean = false;
  constructor(private adminService: AdminService,private routes: Router, private userService: UsersService, private cookieService: CookieService) { }

  selectedStatus = '';
	onSelected(value:string): void {
		this.selectedStatus = value;
	}

  ngOnInit(): void {
    this.userRole = this.cookieService.get('auth-role');
    this.userService.getOrderListByUser().subscribe(
      data => {
        console.log(data);
        this.orders = data;
      },
      error =>{
        console.log(error);
        if(error.status = 403){
          this.routes.navigate(["./login"]);
          this.userService.logout();
        }
      } 
    );
  }
  
  updateOrderStatus( orderId: string, orderStatus: string){
    this.adminService.updateOrderStatus(orderId, orderStatus).subscribe(
      data => {
        console.log(data);
        //  reload page
        window.location.reload(); 
    },
    error =>{
      console.log(error);
    });
  }
  showOrderItems(){
    this.showOrderItemsFlag = true;
  }
  hideOrderItems(){
    this.showOrderItemsFlag = false;
  }
  

}
