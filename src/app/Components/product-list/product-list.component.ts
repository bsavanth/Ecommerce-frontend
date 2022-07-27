import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products!: Product[];
  currentCategoryId!: number;
  currentCategoryName!: string;
  searchMode!: boolean;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.paramMap.subscribe(
      () => {
        this.listProducts();
      }
    );
  }

  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {

      this.handleSearchProducts();
    }
    else{
    this.handleListProducts();
    }
  }

  
  handleSearchProducts() {

   
    const theKeyword: string  = String(this.route.snapshot.paramMap.get('keyword'));
    
    this.productService.searchProducts(theKeyword).subscribe(
      data => {
        this.products = data;
      }
    )
    
    console.log(this.products);

  }


  handleListProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    const hasCategoryName: boolean = this.route.snapshot.paramMap.has('name');

    if (hasCategoryName) {
      this.currentCategoryName = String(this.route.snapshot.paramMap.get('name'));
    }
    else {
      this.currentCategoryName = "Books";
    }

    if (hasCategoryId) {
      this.currentCategoryId = Number(this.route.snapshot.paramMap.get('id'));
    }

    else {

      this.currentCategoryId = 1;

    }

    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )


  }



}

