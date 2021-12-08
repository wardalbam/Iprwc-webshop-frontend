import {ShoppingCartLineModel} from "./shopping-cart-line.model";

export class ShoppingCartModel {
  constructor(public shoppingCartLineList: ShoppingCartLineModel[]) {
  }
}
