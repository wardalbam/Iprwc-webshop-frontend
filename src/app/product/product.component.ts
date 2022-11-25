import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users/users.service';
import {ProductService} from "./product.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
 
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProducts();
    
  }

}
