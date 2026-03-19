import { Output, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  [x: string]: any;
  Name: RegExp = /^[0-9a-zA-Z]{5,20}$/;
  Password: RegExp = /^[0-9a-zA-Z]{5,20}$/;
  NameError?: string;
  PasswordError?: string;

@Output() username:string='' ;
password:string='';
isuserLogged:boolean=false;

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.isuserLogged=this.auth.isUserLogged;
  }

  login(){
    this.isuserLogged=this.auth.isUserLogged;
    if(this.username=='' || !this.Name.test(this.username)){
    alert('Please enter your correct Username');
    return ;
  }

  if(this.password=='' || !this.Password.test(this.password)){
    alert('Please enter correct Password ');
    return;
  }
  this.auth.login(this.username , this.password);
  this.username= '';
  this.password= '';
}

logout() {
  this.auth.logout();
  this.isuserLogged=this.auth.isUserLogged;
}

checkname(name: any) {
  console.log(this.NameError);

  if (!this.Name.test(name)) {
    this.NameError = 'Try again with correct username';
  }
  else {
    this.NameError=undefined;
  }
}
checkpass(password: any) {
  if (!this.Password.test(password)) {
    this.PasswordError ="Password should contain more than 6 characters"
  }
  else {
    this.PasswordError = undefined;
  }

}


}
