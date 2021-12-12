import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductControllerComponent } from './product/product-details/product-controller/product-controller.component';
import { HeaderComponent } from './header/header.component';
import {RouterModule, Routes} from "@angular/router";
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductComponent } from './product/product.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import {CartLineControllerComponent} from "./shopping-cart/cart-line-controller/cart-line-controller.component";
import { ProductSummeryDialogComponent } from './product/product-details/product-summery-dialog/product-summery-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {MatNativeDateModule} from "@angular/material/core";

const appRoutes: Routes = [
  { path: 'cart', component: ShoppingCartComponent },
  { path: '', component: HomeComponent },
  { path: ':product_id', component: ProductDetailsComponent },
  { path: 'cart/:product_id', component: ProductDetailsComponent }

];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductControllerComponent,
    HeaderComponent,
    ShoppingCartComponent,
    ProductComponent,
    HomeComponent,
    ProductDetailsComponent,
    CartLineControllerComponent,
    ProductSummeryDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    MatDialogModule,
    BrowserAnimationsModule,
    // test
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ProductSummeryDialogComponent, ProductDetailsComponent]
})
export class AppModule { }
