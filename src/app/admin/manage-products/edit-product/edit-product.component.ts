import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { ProductService } from 'src/app/product/product.service';
import { Product } from 'src/app/shared/Product.model';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  product: Product;
  constructor(private route: ActivatedRoute,private router:Router, private productService: ProductService, public adminService:AdminService ) { }
  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params)      =>{
        this.productService.getProduct(params["product_id"]).subscribe(
          data =>{
            this.product = data;
          }
        );
      }
    )
  }
  uploadEditedProduct( form : any){
    this.adminService.editProduct(this.product.id, form).subscribe(
      data =>{
        // go to manage-products component
        this.router.navigate(["/admin/manage/product"]);
      },
      error =>{
        console.log(error);
      }
    )
  }

  removeProduct(product_id : string){
    this.adminService.removeProduct(product_id).subscribe(
      data =>{
        // 
        this.router.navigate(["/admin/manage/product"]);
      },
      error =>{
        console.log(error);
      }
    )
  }



}
