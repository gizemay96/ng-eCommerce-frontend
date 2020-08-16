import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/types/product.type';
import { UserService } from 'src/app/services/user.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  get userCart() {
    return this.cartService.getUserCart();
  }

  get cartProducts() {
    return this.cartService.getCartProducts();
  }

  get user() {
    return this.userService.getUser()
  }

  get totalQuantity() {
    return this.userCart.orders.reduce((total, order) => total + order.quantity, 0)
  }

  get getTotal() {
    if (this.cartProducts) {
      return this.cartProducts.reduce((total, product) => {
        const productOrder = this.userCart.orders.find(order => order.product === product.id)
  
        const productTotalPrice = product.price * (productOrder ? productOrder.quantity : 0)
  
        return total + productTotalPrice;
      }, 0)
    }
  }

  constructor(
    private cartService: CartService, 
    private userService: UserService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {}

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product, this.user.id )
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product, this.user.id)
  }

  updateQuantity(updateData) {
    console.log('QQ', updateData)
    this.orderService.updateOrder(updateData.order, updateData.updatedQuantity)
      .subscribe(response => {
        console.log('ASDA', response)
        this.cartService.fetchUserCart(this.user.id)
      })
  }
}
