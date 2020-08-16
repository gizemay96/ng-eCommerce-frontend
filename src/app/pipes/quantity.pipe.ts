import { Pipe, PipeTransform } from '@angular/core';
import { CartService } from '../services/cart.service';

@Pipe({
  name: 'quantity'
})
export class QuantityPipe implements PipeTransform {

  constructor(private cartService: CartService){}

  transform(product, ...args: unknown[]): unknown {
    const userCart = this.cartService.getUserCart();
    const order = userCart.orders.find(order => order.product === product.id)

    return order ? order.quantity : 0;
  }

}
