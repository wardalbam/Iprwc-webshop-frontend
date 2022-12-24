import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { LoginPageComponent } from './users/login-page/login-page.component';
import { RegisterPageComponent } from './users/register-page/register-page.component';
import { AdminComponent } from './admin/admin.component';
import { AddProductsComponent } from './admin/add-products/add-products.component';
import {ManageModeratorsComponent} from "./admin/manage-moderators/manage-moderators.component";
import { CheckoutComponent } from './checkout/checkout.component';
import { OrdersOverviewComponent } from './admin/orders-overview/orders-overview.component';
import { OrderSuccessComponent } from './checkout/order-success/order-success.component';
// import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';



const appRoutes: Routes = [
  { path: 'cart', component: ShoppingCartComponent },
  { path: '', component: ProductListComponent },
  { path: 'product/:product_id', component: ProductDetailsComponent },
  { path: 'cart/:product_id', component: ProductDetailsComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/product/add', component: AddProductsComponent },
  { path: 'admin/manage/mods', component: ManageModeratorsComponent },
  { path: 'checkout', component: CheckoutComponent },
  {path: 'order-success', component: OrderSuccessComponent},
  {path: 'admin/orders', component: OrdersOverviewComponent}
  // allow accsess to route admin only for user with role "ROLE_ADMIN" 
  

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
    OrderSummaryComponent,
    LoginPageComponent,
    RegisterPageComponent,
    AdminComponent,
    AddProductsComponent,
    ManageModeratorsComponent,
    CheckoutComponent,
    OrdersOverviewComponent,
    OrderSuccessComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    MatDialogModule,
    BrowserAnimationsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule
    // PasswordStrengthMeterModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ProductSummeryDialogComponent, ProductDetailsComponent]
})
export class AppModule { }
