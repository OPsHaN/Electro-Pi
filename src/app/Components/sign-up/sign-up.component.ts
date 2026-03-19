import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  username = '';
  password = '';
  email = '';
  phone = '';

  NameError = '';
  PasswordError = '';
  EmailError = '';
  PhoneError = '';
  constructor(private auth:AuthService , private router: Router) {}

  signup() {

    this.NameError = this.username ? '' : 'Username is required';
    this.PasswordError = this.password ? '' : 'Password is required';
    this.EmailError = this.email ? '' : 'Email is required';
    this.PhoneError = this.phone ? '' : 'Phone is required';

    if (this.NameError || this.PasswordError || this.EmailError || this.PhoneError) return;

    const payload = {
      firstName: this.username,
      email: this.email,
      phone: this.phone,
      password: this.password,
      username: this.username 
    };

    this.auth.signup(payload).subscribe({
      next: (response) => {
        console.log(response);
        alert("Account created successfully!");
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error(error);
        alert("Error creating account. Please try again.");
      }
    });
  }

  ngOnInit(): void {
  }

}
