import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductControllerComponent } from './product/product-details/product-controller/product-controller.component';
import { HeaderComponent } from './header/header.component';
import {RouterModule, Routes} from "@angular/router";
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductComponent } from './product/product.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';

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
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
