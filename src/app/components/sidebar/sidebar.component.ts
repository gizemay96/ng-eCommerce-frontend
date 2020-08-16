import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Category } from 'src/app/types/category.type';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
        this.selectedGenre = +params['category'];
    });
  }

  filterProducts() {
    this.productService.filterProducts(this.selectedGenre);
  }

  resetFilters() {
    this.productService.resetFilters()
    this.selectedGenre = null;
  }

  setGenre(event) {
    console.log(event.value)
    this.router.navigate(['/'], {
      queryParams: {category: event.value}
    })    
  }
}
