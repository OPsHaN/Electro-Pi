import { Injectable } from '@angular/core';
import {HttpClient}  from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  productList = new BehaviorSubject<any>([])
  cartProducts:any[] = [];


  constructor(private http: HttpClient ) { }


  //api products
  getproductList(limit:number , skip:number) {
    return this.http.get<any>('https://dummyjson.com/products?limit='+limit+'&skip='+skip);
  }

  //api single product
  getSingleproduct(productId:string){
    return this.http.get<any>('https://dummyjson.com/products/'+productId);
  }

//api categories
getaAllcategories() {
  return this.http.get<any>('https://dummyjson.com/products/categories');

}

//api filterCategories
getFiltercategories(keyword:string) {
  return this.http.get<any>('https://dummyjson.com/products/category/'+keyword);

}

//api serach
getFilterBySearch(query:string) {
  return this.http.get<any>('https://dummyjson.com/products/search?q='+query);
}


setProduct(product:any){
  this.cartProducts.push(...product)
  this.productList.next(product)
}

//get product from list
getProduct(){
  return this.productList.asObservable();
}

//addToCart
addToCart(product:any){
this.cartProducts.push(product);
this.productList.next(this.cartProducts);
this.getTotalPrice();
console.log(this.cartProducts)
}

//get total price at cart componenet

getTotalPrice() : number {
  let grandTotal = 0;
  this.cartProducts.map((a:any)=> {
    grandTotal += a.total;
  })
  return grandTotal;
}

removeCartItem(product:any){
this.cartProducts.map((a:any , index:any)=>{
  if(product.id===a.id){
    this.cartProducts.splice(index,1)
  }
})
this.productList.next(this.cartProducts);
}

removeAllCart(){
  this.cartProducts = []
  this.productList.next(this.cartProducts);
}




}
