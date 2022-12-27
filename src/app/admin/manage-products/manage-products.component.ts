import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product/product.service';
import { Product } from 'src/app/shared/Product.model';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsComponent implements OnInit {

  productsList: Product[];
  constructor( private productService: ProductService) { }

  ngOnInit(): void {
    // get all products from the database
    this.productService.getAllAdminProducts().subscribe(
      data => {
        this.productsList = data;
    },
    error =>{
      console.log(error);
    });
  }

}
