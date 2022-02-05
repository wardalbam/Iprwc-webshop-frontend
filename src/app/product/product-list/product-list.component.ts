import {Component, OnInit} from '@angular/core';
import {Product} from "../../shared/Product.model";
import {ProductService} from "../product.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  productenList: Product[] = [];
  randomInt : number = this.getRandomInt(40);
  constructor(private productService: ProductService) {

  }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(
      data => {
        this.productenList = data;
      }, error => {
        console.log(error);
      }
    )
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  applyStyles(){
    return {
      '&:hover': {
        'transform': 'scale(1.06)'
      }
    };
  }

}
