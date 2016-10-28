import { Injectable }                      from '@angular/core';
import { tokenNotExpired, JwtHelper }      from 'angular2-jwt';
import { Router }                          from '@angular/router';
import { myConfig }                        from './auth.config';

declare var Auth0Lock: any;

var options = {
    theme: {
    logo: '../assets/img/logo.png',
    primaryColor: '#779476'
    },
    languageDictionary: {
    emailInputPlaceholder: "email@example.com",
    title: "Login or SignUp"
  }, 
 };

@Injectable()
export class Auth {
  lock = new Auth0Lock(myConfig.clientID, myConfig.domain, options, {});
  userProfile: Object;
  constructor(private router: Router) {
    this.userProfile = JSON.parse(localStorage.getItem('profile'));
    this.lock.on('authenticated', (authResult: any) => {
      localStorage.setItem('access_token', authResult.idToken);
      this.lock.getProfile(authResult.idToken, (error: any, profile: any) => {
        if (error) {
          console.log('This did not work!');
          return;
        }
        localStorage.setItem('profile', JSON.stringify(profile));
        this.userProfile = profile;
        this.router.navigateByUrl('/profile');
      });
      this.lock.hide();
    });
  }

  public login() {
    this.lock.show();
  }
  
  private get accessToken(): string {
        return localStorage.getItem('access_token');
    }

  public authenticated(): boolean {
    try {
        var jwtHelper: JwtHelper = new JwtHelper();
        var token = this.accessToken;
        if (jwtHelper.isTokenExpired(token))
            return false;
        return true;
    }
    catch (err) {
        return false;
    }
  }

  public logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('access_token');
    this.userProfile = undefined;
  };
}