import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { Product } from '../types/product.type';
import { Category } from '../types/category.type';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [];
  private categories: Category[] = [];
  private filteredProducts: Product[];

  constructor(private http: HttpClient) {}

  fetchProducts() {
    this.http.get(env.productsApiURL).subscribe((response: Product[]) => {
      this.products = response;
    });
  }

  fetchSortedProducts(sortType: string, sortDirection: string) {
    this.http
      .get(`${env.productsApiURL}/?_sort=${sortType}:${sortDirection}`)
      .subscribe((response: Product[]) => {
        this.products = response;
      });
  }

  fetchCategories() {
    this.http.get(env.categoriesApiURL).subscribe((response: Category[]) => {
      this.categories = response;
    });
  }

  getProducts() {
    return this.products;
  }

  getFilteredProducts() {
    return this.filteredProducts;
  }

  getCategories() {
    return this.categories;
  }

  filterProducts(genreId) {
    this.filteredProducts = this.products.filter((product) =>
      product.categories.some((category) => category.id === genreId)
    );
  }

  resetFilters() {
    this.filteredProducts = null;
  }
}
