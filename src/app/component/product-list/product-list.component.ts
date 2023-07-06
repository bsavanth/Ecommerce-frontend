import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number=1;
  prevCategoryId:number =1;
  currentCategoryName!: string;
  searchMode!: boolean;

  //pagination properties
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 10;


  constructor(private productService: ProductService, private cartService:CartService, private route: ActivatedRoute) {
  }

  ngOnInit() {

    //Call back method after changes in change detector
    this.route.paramMap.subscribe(
      () => {
        this.listProducts();
      }
    );
  }


  //Check if there is any keyword in search bar and display accordingly
  listProducts() {

    //check for keyword
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {

      //Display results based on keyword
      this.handleSearchProducts();
    } else {

      //display results based of pagination, categories etc.
      this.handleListProducts();
    }
  }


  // List products based on rules
  handleListProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    const hasCategoryName: boolean = this.route.snapshot.paramMap.has('name');

  
    // Category header in the results list page
    if (hasCategoryName) {
      this.currentCategoryName = String(this.route.snapshot.paramMap.get('name'));
    } else {
      this.currentCategoryName = "Books";
    }

    // results based on router calls from side navbar
    if (hasCategoryId) {
      this.currentCategoryId = Number(this.route.snapshot.paramMap.get('id'));
    } else {

      this.currentCategoryId = 1;

    }

    // Check to see if category changed while using pagination
    if(this.currentCategoryId!=this.prevCategoryId)
    {
        this.thePageNumber=1; 
    }

    this.prevCategoryId = this.currentCategoryId;

    this.productService.getProductListPaginate(this.thePageNumber-1, this.thePageSize, this.currentCategoryId).subscribe(
      data => {
        this.products = data._embedded.products;
        this.thePageNumber = data.page.number+1;
        this.thePageSize = data.page.size;
        this.theTotalElements = data.page.totalElements;
      }
    )


  }


  //Controller for Search bar in UI
  handleSearchProducts() {


    const theKeyword: string = String(this.route.snapshot.paramMap.get('keyword'));

    this.productService.searchProducts(theKeyword).subscribe(
      data => {
        this.products = data;
      }
    )

    console.log(this.products);

  }

  updatePageSize(pageSize:number)
  {
    this.thePageSize=pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }


  addToCart(product:Product)
  {
    this.cartService.addToCart(new CartItem(product));
  }


}

