import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AdminService} from "../admin.service";
import {Product} from "../../shared/Product.model";

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {
  showAlert = false;
  alertMessage :string;
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
  }
  onUploadProduct(form: NgForm){
    let product : Product =  form.value;
    this.adminService.uploadProduct(product).subscribe(
      (data)=>{
        this.showAlert = true;
        this.alertMessage = "success!! you havce added new product" + form.value["name"] ;
        form.reset();
      },
      (error)=>{
        this.showAlert = true;
        this.alertMessage= error.message;
      }
    )
  }

}
