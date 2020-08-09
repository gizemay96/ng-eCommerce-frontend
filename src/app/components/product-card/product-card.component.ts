import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/types/product.type';
import { User } from 'src/app/types/user.type';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  @Input() user: User;

  constructor(private cartService:CartService) {}

  ngOnInit(): void { }
  
  addToCart(product: Product) {
    
    this.cartService.addToCart(product, this.user.id)
  }
}
