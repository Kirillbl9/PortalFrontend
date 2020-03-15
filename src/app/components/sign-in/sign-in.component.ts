import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public signInData = {email: '', password: ''};
  public serverError: any;
  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService) { }

  ngOnInit() {
    if (this.authService.userLoggedIn.getValue()) {
      this.router.navigate(['/profile']);
    }
  }

  login() {
    // TODO validation and compare passwords
    this.authService.login(this.signInData)
      .subscribe(
        data => {
          if (data['accessToken']) {
            this.authService.saveToken(data['accessToken']);
            this.cookieService.put('email', this.signInData.email);
            this.authService.userService.getLoggedInUser().subscribe(
              value => {this.authService.userLoggedIn.next(value);
                this.router.navigate(['/profile']);
              });
          }},
        error => this.serverError = error.error.message
      );
  }

  loginWithFacebook() {

  }

  loginWithGoogle() {

  }
}
