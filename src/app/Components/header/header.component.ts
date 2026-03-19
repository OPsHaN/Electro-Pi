import { Observable, Observer } from 'rxjs';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from '../../services/products.service';
import { Iproduct } from './../../models/iproduct';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit {

  productList!:Iproduct[] | any;
  isuserLogged:boolean | undefined;
  totalItems : number = 0;
  cartProduct : any = [];
  welcomeUser : any = '';

  constructor(private auth:AuthService  , private product:ProductsService , private router:Router) {

   }


  ngOnInit(): void {


this.auth.getLoggedStatus().subscribe (status=> {
this.isuserLogged=status;
})


//update the number of cart from service
this.product.getProduct()
.subscribe(res=>{
this.totalItems = res.length;
})
//update the number of cart from localstorage
this.getCountCart();

//get the the username from localsrorage
this.auth.userName$.subscribe(name => {
  this.welcomeUser = name;
});
  }


  //get the number of cart from localstorage
  getCountCart(){
    if("cart" in localStorage) {
      this.cartProduct = JSON.parse(localStorage.getItem("cart")!)
      this.totalItems = this.cartProduct.length;
    }
  }

  //logout and remove the local storage
  logout() {
    this.auth.logout();
    this.isuserLogged=this.auth.isUserLogged;
  }


  //Search
  searchProduct(query:KeyboardEvent) {
    if(query) {
      const elemnnt=query.target as HTMLInputElement;
      this.product.getFilterBySearch(elemnnt.value).subscribe((result) => {
        if(result.products.length>10){
          result.products.length=10;
        }
        this.productList=result.products;
      })
    }
  }


//hide search when you remove the search keyword
hideSearch() {
  this.productList=undefined;
}

//get the data when you press on search icon and route to search componenets
  getSearchProduct(val : string) {
  this.router.navigate([`search/${val}`])
  .then(() => {
    window.location.reload();
  });
  }


}
