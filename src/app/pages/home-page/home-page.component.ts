import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { Product } from 'src/app/types/product.type';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  pagedList: Product[];

  pageSize = 20;
  pageSizeOptions: number[] = [2, 5, 10, 15, 20];

  get products() {
    return this.productService.getProducts();
  }

  get filteredProducts() {
    return this.productService.getFilteredProducts();
  }

  get user() {
    return this.userService.getUser();
  }

  constructor(
    private productService: ProductService,
    private userService: UserService,
    private cartService:CartService
  ) {}

  ngOnInit(): void {
    this.productService.fetchProducts();
    this.productService.fetchCategories();
    
  }

  onPageChange(e) {
    
    let startIndex = e.pageIndex * e.pageSize;
    let endIndex = startIndex + e.pageSize;

    if (endIndex > this.products.length) {
      endIndex = this.products.length;
    }
    this.pagedList = this.products.slice(startIndex, endIndex);
   
  }

  sortProducts(sortType, sortDirection) {
    this.productService.fetchSortedProducts(sortType, sortDirection);
    
  }
}
