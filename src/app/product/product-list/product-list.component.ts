import { Component, OnInit } from '@angular/core';
import {Product} from "../../shared/Product.model";
import {ProductService} from "../product.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productenList: Product[];
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productenList = this.productService.getAllProducts();
  }

}
