import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { LoginComponent } from './Components/login/login.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './Components/products/products.component';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './Components/home/home.component';
import { SearchComponent } from './Components/search/search.component';
import { SpinnerComponent } from './Components/spinner/spinner.component';
import { CartComponent } from './Components/cart/cart.component';
import { ProductdetailsComponent } from './Components/productdetails/productdetails.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    ProductsComponent,
    HomeComponent,
    SearchComponent,
    SpinnerComponent,
    CartComponent,
    ProductdetailsComponent,
    SignUpComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AuthService],
    bootstrap: [AppComponent]
})
export class AppModule { }
