import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-oauth2-redirect-handler',
  templateUrl: './oauth2-redirect-handler.component.html',
  styleUrls: ['./oauth2-redirect-handler.component.css']
})
export class Oauth2RedirectHandlerComponent implements OnInit {

  constructor(private route: ActivatedRoute, router: Router, private authService: AuthService, private userService: UserService,
              private cookieService: CookieService) {
    const token = this.route.snapshot.queryParamMap.get('token');
    const error = this.route.snapshot.queryParamMap.get('error');

    if (token) {
      this.authService.saveToken(token);
      this.userService.getLoggedInUser().subscribe(
        data => {
          if (data['email']) {
            this.cookieService.put('email', data['email']);
          }
        }
    );
      this.userService.getLoggedInUser().subscribe(value => {this.authService.userLoggedIn.next(value); });
      router.navigate(['/profile']);
    } else {
      router.navigate(['/sign-in']);
    }
  }

  ngOnInit() {
  }

}
