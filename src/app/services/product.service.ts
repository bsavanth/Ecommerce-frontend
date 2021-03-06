import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import {map} from 'rxjs'
import { ProductCategory } from '../common/product-category';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category'


  constructor(private httpClient:HttpClient) { }

  getProductList(theCategoryId: Number):Observable<Product[]>
  {

      const url = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
      return this.getProducts(url);
  }

  getProducts(searchUrl:string):Observable<Product[]>
  {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(map(response => response._embedded.products));
  }

  searchProducts(theKeyword:string)
  {


    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProducts(searchUrl);

  }
 
  getProductCategories():Observable<ProductCategory[]>
  {
      return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
             map(response => response._embedded.productCategory)

  );

  }

}

interface GetResponseProducts {

    _embedded:{
      products:Product[];
    }

}

interface GetResponseProductCategory {

  _embedded:{
    productCategory:ProductCategory[];
  }

}




