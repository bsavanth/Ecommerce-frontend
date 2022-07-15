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
      return this.httpClient.get<GetResponseProducts>(url).pipe(
             map(response => response._embedded.products)

      );
  }

 
  getProductCategories()
  {
      return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
             map(response => response._embedded.productCategories)

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
    productCategories:ProductCategory[];
  }

}




