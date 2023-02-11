import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/product/product.service';
import { Product } from 'src/app/shared/Product.model';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsComponent implements OnInit {

  productsList: Product[];
  constructor( private productService: ProductService, private routes: Router, private userService: UsersService) { }

  ngOnInit(): void {
    // get all products from the database
    this.productService.getAllAdminProducts().subscribe(
      data => {
        this.productsList = data;
    },
    error =>{
      // if error.status = 403
      if(error.status = 403){
        this.routes.navigate(["./login"]);
        this.userService.logout();
      }
    });
  }

  // delete product
  deleteProduct(id: string){
    this.productService.deleteProduct(id).subscribe(
      data => {
        console.log(data);
        this.ngOnInit();
    },
    error =>{
      console.log(error);
    });
  }

}
