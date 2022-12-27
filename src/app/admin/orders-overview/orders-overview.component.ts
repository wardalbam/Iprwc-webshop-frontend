import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Order } from 'src/app/shared/order.model';
import { UsersService } from 'src/app/users/users.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-orders-overview',
  templateUrl: './orders-overview.component.html',
  styleUrls: ['./orders-overview.component.css']
})
export class OrdersOverviewComponent implements OnInit {

  orders: any[];
  userRole: string;
  constructor(private adminService: AdminService, private userService: UsersService, private cookieService: CookieService) { }

  selectedStatus = '';
	onSelected(value:string): void {
		this.selectedStatus = value;
	}

  ngOnInit(): void {
    this.userRole = this.cookieService.get('auth-role');
    this.userService.getOrderListByUser().subscribe(
      data => {
        console.log(data);
        // order the orders by order.orderDate 
        this.orders = data;
    });

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

}
