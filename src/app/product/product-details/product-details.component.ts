import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {ProductService} from "../product.service";
import {Product} from "../../shared/Product.model";
import {style} from "@angular/animations";
import { ShoppingCartService } from 'src/app/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productDetails : Product;
  constructor(private route: ActivatedRoute, private productService: ProductService, private shoppingCartService: ShoppingCartService ) {

   }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params)      =>{
        this.productService.getProduct(params["product_id"]).subscribe(
          data =>{
            this.productDetails = data;
          }
        );
      }
    )

  }

}
