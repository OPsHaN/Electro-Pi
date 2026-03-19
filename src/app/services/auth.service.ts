import { Injectable } from '@angular/core';
import {HttpClient}  from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
//refresh the data from property when log in or log out
  private isUserLoggedObject:BehaviorSubject<boolean>

  private userNameObject: BehaviorSubject<string | null>;
userName$: Observable<string | null>;

  constructor(private http: HttpClient ,private router:Router) {

  this.isUserLoggedObject=new BehaviorSubject<boolean>(this.isUserLogged);
  this.userNameObject = new BehaviorSubject<string | null>(localStorage.getItem("username"));
  this.userName$ = this.userNameObject.asObservable();

   }

//login

login(username: string , password:string) {
    this.http.post('https://dummyjson.com/auth/login', {
      username: username,
      password: password,
    })
      .subscribe({
        next: (response:any) => {
          console.log(response)
          alert("Welcome : "+username);
          // localStorage.setItem("token" ,response.token);
          localStorage.setItem("username" ,response.username);
      this.isUserLoggedObject.next(true);
      this.userNameObject.next(response.username); 
          this.router.navigate(['/products']);
        },
        error: (error) => {
          console.error(error);
          alert("Your Details Is Wrong . Please Try again");
          this.router.navigate(['/login']);
        }
      });
  }

  signup(data: any) {
    return this.http.post('https://dummyjson.com/users/add', data);
  }



//logout

  logout(){
    // localStorage.removeItem("token");
    localStorage.removeItem("username");
    this.isUserLoggedObject.next(false);
    this.userNameObject.next(null);
  }

//check when user login and the token saved in localstorage

  get isUserLogged() {
// return (localStorage.getItem("token"))?true:false;
return (localStorage.getItem("username"))?true:false;

  }


  //refresh the data when login or logout
  getLoggedStatus():Observable<boolean>{
    return this.isUserLoggedObject.asObservable();
  }



}