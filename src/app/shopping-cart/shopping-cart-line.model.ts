import {Product} from "../shared/Product.model";

export class ShoppingCartLineModel {
  constructor(public product: Product, public amount: number) {
  }
}
