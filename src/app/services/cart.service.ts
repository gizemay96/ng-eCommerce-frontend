import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { Cart } from '../types/cart.type';
import { Product } from '../types/product.type';
import { Order } from '../types/order.type';
import { OrderService } from './order.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private userCart: Cart;
  private cartProducts: Product[];

  constructor(
    private http: HttpClient,
    private orderService: OrderService,
  ) {}

  fetchUserCart(userId: number) {
    this.http.get(`${env.cartsApiURL}?user=${userId}`)
      .subscribe((response: Cart) => {
        this.userCart = response[0];
        this.fetchCartDetailsById(this.userCart.orders)
      });
  }

  resetCart() {
    this.userCart = null;
    this.cartProducts = null;
  }

  getUserCart() {
    return this.userCart;
  }

  getCartProducts() {
    return this.cartProducts;
  }

  fetchCartDetailsById(orders) {
    const query = orders.map(order => `id_in=${order.product}`).join('&')

    this.http.get(`${env.productsApiURL}?${query}`)
      .subscribe((response: Product[]) => {
        this.cartProducts = response
      })
  }

  createCart(userId) {
    const token = window.localStorage.getItem('token');
    const httpOptions = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const newCart = {
      user: userId,
      orders: []
    }

    this.http.post(`${env.cartsApiURL}`, newCart, httpOptions)
      .subscribe((response: Cart) => {
        this.userCart = response
      })
  }

  addToCart(newProduct: Product, userId: number) {
    const existingOrder = this.userCart.orders.find(order => order.product === newProduct.id)

    if (existingOrder) {
      this.orderService.updateOrder(existingOrder, existingOrder.quantity + 1)
        .subscribe(response => {
          this.fetchUserCart(userId)
        })
    } else {
      this.orderService.createOrder(newProduct.id, userId)
        .subscribe((response: Order) => {
          this.updateCart(response.id, userId)
            .subscribe(response => {
              this.fetchUserCart(userId)
            })
        })
    }
  }

  updateCart(orderId: number, userId: number) {
    const token = window.localStorage.getItem('token');
    const httpOptions = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const updatedCart = {
      ...this.userCart,
      user: userId,
      orders: [...this.userCart.orders, orderId]
    }

    return this.http.put(
      `${env.cartsApiURL}/${this.userCart.id}`,
      updatedCart,
      httpOptions
    )
  }

  removeFromCart(product: Product, userId: number) {
    const existingOrder = this.userCart.orders.find(order => order.product === product.id)

    if (!existingOrder) return;

    if (existingOrder.quantity > 1) {
      this.orderService.updateOrder(existingOrder, existingOrder.quantity - 1)
        .subscribe(response => {
          this.fetchUserCart(userId)
        })
    } else {
      this.orderService.deleteOrder(existingOrder.id)
        .subscribe(response => {
          this.fetchUserCart(userId)
        })
    }
  }
}
