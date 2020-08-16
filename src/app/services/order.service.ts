import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment as env} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient
  ) { }

  createOrder(productId: number, userId: number) {
    const token = window.localStorage.getItem('token')
    const httpOptions = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const newOrder = {
      product: productId,
      user: userId,
      quantity: 1
    }

    return this.http.post(env.orderApiURL, newOrder, httpOptions)
  }

  updateOrder(existingOrder, n: number) {
    const token = window.localStorage.getItem('token')
    const httpOptions = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const updatedOrder = {
      ...existingOrder,
      quantity: n
    }

    return this.http.put(`${env.orderApiURL}/${existingOrder.id}`, updatedOrder, httpOptions)
  }

  deleteOrder(orderId) {
    const token = window.localStorage.getItem('token')
    const httpOptions = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    return this.http.delete(`${env.orderApiURL}/${orderId}`, httpOptions)
  }
}
