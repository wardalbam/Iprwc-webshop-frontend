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
import { OrdersOverviewComponent } from './admin/maange-orders/orders-overview.component';
import { OrderSuccessComponent } from './checkout/order-success/order-success.component';
import { ManageProductsComponent } from './admin/manage-products/manage-products.component';
import { EditProductComponent } from './admin/manage-products/edit-product/edit-product.component';
import { OrderDetailsComponent } from './admin/maange-orders/order-details/order-details.component';
import { AddManagerComponent } from './admin/manage-moderators/add-manager/add-manager.component';
// import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';



const appRoutes: Routes = [
  { path: 'cart', component: ShoppingCartComponent },
  { path: '', component: ProductListComponent },
  { path: 'product/:product_id', component: ProductDetailsComponent },
  { path: 'cart/:product_id', component: ProductDetailsComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/manage/product', component: ManageProductsComponent },
  { path: 'admin/manage/product/add', component: AddProductsComponent },
  { path: 'admin/manage/product/edit/:product_id', component: EditProductComponent },
  { path: 'admin/manage/mods', component: ManageModeratorsComponent },
  { path: 'admin/manage/mods/add', component: AddManagerComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'order-success', component: OrderSuccessComponent},
  { path: 'admin/manage/orders', component: OrdersOverviewComponent},
  { path: 'admin/manage/orders/:order_id', component: OrderDetailsComponent}
  

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
    LoginPageComponent,
    RegisterPageComponent,
    AdminComponent,
    AddProductsComponent,
    ManageModeratorsComponent,
    CheckoutComponent,
    OrdersOverviewComponent,
    OrderSuccessComponent,
    ManageProductsComponent,
    EditProductComponent,
    ProductSummeryDialogComponent,
    OrderSummaryComponent,
    AddManagerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    MatDialogModule,
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
