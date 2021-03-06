import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import {Routes, RouterModule} from '@angular/router'
import { AppComponent } from './app.component';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { ProductService } from './services/product.service';
import { ProductCategoryMenuComponent } from './Components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './Components/search/search.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';


const routes:Routes = [

{path: 'category/:id/:name', component : ProductListComponent},
{path: 'products/:id', component: ProductListComponent}
{path: 'search/:keyword', component:ProductListComponent},
{path: 'category', component : ProductListComponent},
{path: 'products', component : ProductListComponent},
{path: '', redirectTo:'/products', pathMatch: 'full'},
{path: '**',redirectTo:'/products', pathMatch: 'full'}

];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
