import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Category } from 'src/app/types/category.type';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  selectedGenre;

  get categories() {
    return this.productService.getCategories();
  }

  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  filterProducts() {
    this.productService.filterProducts(this.selectedGenre);
  }

  resetFilters() {
    this.productService.resetFilters()
    this.selectedGenre = null;
  }
}
