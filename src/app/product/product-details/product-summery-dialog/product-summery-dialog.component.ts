import {Component, ElementRef, HostListener, Inject, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ShoppingCartLineModel} from "../../../shopping-cart/shopping-cart-line.model";
import {Product} from "../../../shared/Product.model";
import {ShoppingCartService} from "../../../shopping-cart/shopping-cart.service";

@Component({
  selector: 'app-product-summery-dialog',
  templateUrl: './product-summery-dialog.component.html',
  styleUrls: ['./product-summery-dialog.component.scss']
})
export class ProductSummeryDialogComponent implements OnInit {
  Line :  ShoppingCartLineModel;

  constructor(public hostElement: ElementRef,
              public dialogRef: MatDialogRef<ProductSummeryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              public shoppingCartService: ShoppingCartService) {
    this.Line = data.Line;
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }
  getAmountProductsInCart(){
    return this.shoppingCartService.getTotalAmountProducts();
  }

}
