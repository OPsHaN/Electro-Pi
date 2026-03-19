import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import {render} from 'creditcardpayments/creditCardPayments'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartProduct : any = [];
  grandTotal : number = 0;
  defaultValue : number = 1;
  constructor(private product:ProductsService) { 


//get the paypal payment
   render ({
     id:"#paypalButton",
     currency:"USD",
     value:"10.00",
     onApprove: (details) => {
      alert("Transaction Successfull");
     }
   });

  }

  ngOnInit(): void {

    //get the product from service
    this.product.getProduct().subscribe(res=>{
    this.cartProduct = res;
    })


    this.getCartProduct()
  }

  //remove the product from cart
  removeProduct(index:number) {
    this.cartProduct.splice(index , 1)
    this.product.removeCartItem(index)
    this.getCartTotal()
    localStorage.setItem("cart" , JSON.stringify(this.cartProduct))
}

  //empty the cart
  emptyCart(){ 
    this.cartProduct = []
    this.getCartTotal()
    this.product.removeAllCart()
    localStorage.setItem("cart" , JSON.stringify(this.cartProduct))
  }
  

//get the product from local storage
  getCartProduct(){
    if("cart" in localStorage) {
      this.cartProduct = JSON.parse(localStorage.getItem("cart")!)
  }
     this.getCartTotal()
  }


//get the total price in cart
  getCartTotal(){
    this.grandTotal = 0
    for(let x in this.cartProduct) {
      this.grandTotal += this.cartProduct[x].price  * this.cartProduct[x].quantity  ;
    }
  }


  //add amounnt
  addAmount(index:number) {
   this.cartProduct[index].quantity++
   this.getCartTotal()
   localStorage.setItem("cart" , JSON.stringify(this.cartProduct))
  }


  //mins amount
  minsAmount(index:number){
    this.cartProduct[index].quantity--
    this.getCartTotal()
    localStorage.setItem("cart" , JSON.stringify(this.cartProduct))
  }

  //detect the change that you put the new data  in the input 
  detectChange(){
    this.getCartTotal()
    localStorage.setItem("cart" , JSON.stringify(this.cartProduct))
  }



}
