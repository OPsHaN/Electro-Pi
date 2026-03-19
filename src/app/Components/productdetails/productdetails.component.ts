import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iproduct } from 'src/app/models/iproduct';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss']
})
export class ProductdetailsComponent implements OnInit {

  loading:boolean = false;
  productData:undefined | any;
  cartProducts : any[] = [];
  isDisabled: boolean = true;

  constructor(private activeRoute:ActivatedRoute ,  private product:ProductsService) { }

ngOnInit(): void {
let productId = this.activeRoute.snapshot.paramMap.get('productId');
this.loading=true;
productId && this.product.getSingleproduct(productId).subscribe((res) => {
console.log(res);
this.loading=false;
this.productData = res;
})

    }

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


}
