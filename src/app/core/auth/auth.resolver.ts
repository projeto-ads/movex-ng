import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { AuthService } from './auth.service';
import jwt_decode from 'jwt-decode';
import { Profile } from 'src/app/model/profile.model';

@Injectable({
  providedIn: 'root'
})
export class AuthResolver implements Resolve<void> {

  constructor(
    private authService: AuthService
  ) { }

  resolve() {
    if (this.authService.isUserLoggedIn() && !this.authService.profileInfo) {
      const token = window.localStorage.getItem('token');
      const decoded: any = jwt_decode(String(token));
      this.authService.profileInfo = new Profile({ id: decoded.sub, email: decoded.email });
    }
  }
}
