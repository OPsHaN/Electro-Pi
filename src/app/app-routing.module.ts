import { NgModule, Component } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./Components/home/home.component";
import { LoginComponent } from "./Components/login/login.component";
import { ProductsComponent } from "./Components/products/products.component";
import { SearchComponent } from "./Components/search/search.component";
import { GuardGuard } from "./guard.guard";
import { CartComponent } from "./Components/cart/cart.component";
import { ProductdetailsComponent } from "./Components/productdetails/productdetails.component";
import { SignUpComponent } from "./Components/sign-up/sign-up.component";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "home", component: HomeComponent, canActivate: [GuardGuard] },
  { path: "products", component: ProductsComponent, canActivate: [GuardGuard] },
  { path: "login", component: LoginComponent },
  {
    path: "search/:query",
    component: SearchComponent,
    canActivate: [GuardGuard],
  },
  {
    path: "details/:productId",
    component: ProductdetailsComponent,
    canActivate: [GuardGuard],
  },
  { path: "cart", component: CartComponent, canActivate: [GuardGuard] },
  { path: "signup", component: SignUpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
