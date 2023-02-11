import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Order } from 'src/app/shared/order.model';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  order: any;

  constructor(private route: ActivatedRoute, private adminService:AdminService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params)      =>{
        this.adminService.getOrderDetails(params["order_id"]).subscribe(
          data =>{
            this.order = data;
            console.log(this.order);
          },
          error =>{
            console.log(error);
          }
        );
      }
    )
    
  }

  goBack(){
    window.history.back();
  }
  
}
