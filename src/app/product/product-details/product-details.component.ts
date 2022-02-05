import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {ProductService} from "../product.service";
import {Product} from "../../shared/Product.model";
import {style} from "@angular/animations";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productDetails : Product;
  constructor(private route: ActivatedRoute, private productService: ProductService ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params)      =>{
        this.productDetails = this.productService.getProduct(params["product_id"]);
      }
    )
  }

}
