import {Component, HostListener, Input, OnInit} from '@angular/core';
import {Product} from "../../../shared/Product.model";
import {ShoppingCartService} from "../../../shopping-cart/shopping-cart.service";
import {Subscription} from "rxjs";
import { Router} from "@angular/router";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ProductSummeryDialogComponent} from "../product-summery-dialog/product-summery-dialog.component";
import {ShoppingCartLineModel} from "../../../shopping-cart/shopping-cart-line.model";


@Component({
  selector: 'app-product-controller',
  templateUrl: './product-controller.component.html',
  styleUrls: ['./product-controller.component.scss']
})
export class ProductControllerComponent implements OnInit {
  @Input() product: Product;
  currentRoute: string;
  amount_product : number = 1;
  subscription: Subscription;
  clickoutHandler: Function;
  dialogRef: MatDialogRef<ProductSummeryDialogComponent>;

  constructor(private shoppingCartService: ShoppingCartService,
              public router: Router,
              public dialog : MatDialog) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    document.onclick = (args: any) : void => {
      if(args.target.tagName === 'BODY') {
        this.dialog.closeAll();
      }
    }
  }

  raiseAmount(){
    this.amount_product++;
  }

  lowerAmount(){
    if(this.amount_product > 0){
      this.amount_product--;
    }
  }

  addProductToCart(){
    if(this.amount_product > 0){
      this.shoppingCartService.addProductToCartInBulk(this.product, this.amount_product);
      // show pop-up
      this.openDialog();
      this.amount_product = 1;
    }
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.clickoutHandler) {
      this.clickoutHandler(event);
    }
  }

  openDialog(): void {
    this.dialogRef = this.dialog.open(ProductSummeryDialogComponent, {
      data : { Line :new ShoppingCartLineModel(this.product  , this.amount_product)},
      hasBackdrop : false
    });
    this.dialogRef.updatePosition(
      { left: `0`, top: `-50%` }
    )
    this.dialogRef.afterOpened().subscribe(() => {
      this.clickoutHandler = this.closeDialogFromClickout;
    });
    this.dialogRef.afterClosed().subscribe(() => {
      this.clickoutHandler = null;
    });
  }

  closeDialogFromClickout(event: MouseEvent) {
    const matDialogContainerEl = this.dialogRef.componentInstance.hostElement.nativeElement.parentElement;
    const rect = matDialogContainerEl.getBoundingClientRect();
    if(event.clientX <= rect.left || event.clientX >= rect.right ||
      event.clientY <= rect.top || event.clientY >= rect.bottom) {
      this.dialogRef.close();
    }
  }

}
