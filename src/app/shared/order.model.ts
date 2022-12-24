import { Timestamp } from "rxjs";
import { ShoppingCartLineModel } from "../shopping-cart/shopping-cart-line.model";
import {ShoppingCartModel} from "../shopping-cart/shopping-cart-model";
import { Address } from "./Address.model";
export class Order{
    constructor(
        ProductLineList : ShoppingCartLineModel[], 
        ShippingAddress:Address,  
        ) {}
  }
