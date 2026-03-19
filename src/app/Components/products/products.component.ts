import { Iproduct } from './../../models/iproduct';
import { ProductsService } from '../../services/products.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {


isDisabled: boolean = true;
searchKey="string";
isReadMore = true;
productList!:Iproduct[] | any;
categoryList:any[] = [];
totalItems!:number;
skipItems:number = 0;
limitItems:number =9;
currentpageIndex: number = 0;
pagesnumbers:number[]=[];
loading:boolean = false;
cartProducts : any[] = [];
addButton : boolean = false;

onInput(event: any){
    
  // Get the input's value
  let text = event.target.value;
  // Keep the button disabled if input is empty
  if(text==''){
    alert("Please put any value in Quantity")
    this.isDisabled = true;
  }
  else{
    this.isDisabled = false;
  }
}


  constructor(private product:ProductsService , private router:Router) { }

  ngOnInit(): void {


    //test the data and save the product at localstorage
    // this.product.getProduct().subscribe(res=>{
    //   this.cartProducts = res;
    //   this.grandTotal = this.product.getTotalPrice();
    //   this.cartProducts.forEach((a:any) => {
    //     Object.assign(a,{quantity:1,total:a.price})
    //   });
    // })

this.getProducts(this.skipItems , this.currentpageIndex)
this.getCategories();

  }


  //getProducts
  getProducts(skip:number , currentPage:number){
    this.loading=true;
    this.product.getproductList(this.limitItems , this.limitItems*currentPage).subscribe((result)=> {
      this.productList=result.products;
      this.totalItems=result.total;
      this.skipItems=skip;
      this.currentpageIndex=currentPage;
      this.loading=false;
      this.pagesnumbers=[];
      for (let index = 0; index < (this.totalItems/this.limitItems); index++) {
      this.pagesnumbers.push(index+1)
      }
      })
  }
  

  trackByFn(index: any) {
    return index;
  }

  showText() {
    this.isReadMore = !this.isReadMore
 }


 //getCategories
 getCategories() {
  this.loading=true;
  this.product.getaAllcategories().subscribe((res:any) =>{
this.categoryList = res
this.loading=false;
  } , error => {
alert(error)
  });
  
 }

 //filterCategories
 getFilter(event:any){
 let value = event.target.value;
 if(value == "all"){
  this.getProducts(this.skipItems , this.currentpageIndex)
}
 else {
  this.getFilterProducts(value);
 }
 }
 
getFilterProducts(keyword:string){
  this.loading=true;
  this.product.getFiltercategories(keyword).subscribe((res:any) =>{
    this.loading=false;
this.productList = res.products;
});
}


//add to cart to local storage
addToCart(product:any){
// this to make acounter of cary is live
this.product.addToCart(product)
//this to save the product you press on cart at local strorage
if("cart" in localStorage) {
  this.cartProducts = JSON.parse(localStorage.getItem("cart")!)
  let exit = this.cartProducts.find(({id}) => id === product.id)
  if(exit){
    alert("this product is already at cart")
  }
  else {
    this.cartProducts.push(product)
    localStorage.setItem("cart" , JSON.stringify(this.cartProducts))
  }
}
else{
  this.cartProducts.push(product)
  localStorage.setItem("cart" , JSON.stringify(this.cartProducts)) 
}
}



// addToCart(product:any){
//   this.product.addToCart(product)
// }
  

}
