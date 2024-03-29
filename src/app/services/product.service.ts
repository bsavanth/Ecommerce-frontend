import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../common/product';
import {map} from 'rxjs'
import {ProductCategory} from '../common/product-category';
import { NumberSymbol } from '@angular/common';
import { NumberValueAccessor } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category'


  constructor(private httpClient: HttpClient) {
  }



  getProductListPaginate(thePage:number, thePageSize:number, theCategoryId: Number): Observable<GetResponseProducts> {

    const url = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                +`&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(url);
  }



  getProductList(theCategoryId: Number): Observable<Product[]> {

    const url = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts(url);
  }

  getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(map(response => response._embedded.products));
  }


  getProduct(theProductId: Number): Observable<Product> {
    const searchUrl: string = `${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(searchUrl);
  }


  searchProducts(theKeyword: string) {


    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProducts(searchUrl);

  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );

  }


}

interface GetResponseProducts {

  _embedded: {
    products: Product[];
  },

  page:{
    size:number,
    totalElements:number,
    totalPages:number,
    number:number

  }

}


interface GetResponseProductCategory {

  _embedded: {
    productCategory: ProductCategory[];
  }

}




