import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/types/product.type';
import { CartService } from 'src/app/services/cart.service';
import { Order } from 'src/app/types/order.type';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {
  @Input() product: Product;
  @Output() decrementClick = new EventEmitter();
  @Output() incrementClick = new EventEmitter();
  @Output() quantityChanged = new EventEmitter();
  isEdit: boolean = false;
  itemQuantity: number;
  order: Order;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    const userCart = this.cartService.getUserCart()
    this.order = userCart.orders.find(order => order.product === this.product.id);

    this.itemQuantity = this.order ? this.order.quantity : 0;
  }

  changeQuantity() {
    this.isEdit = false;
    this.quantityChanged.emit({
      updatedQuantity: this.itemQuantity,
      order: this.order,
    })
  }

}
