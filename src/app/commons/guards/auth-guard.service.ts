import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private aservice: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot) {
    const expectedRole = route.data['expectedRole'];
    const actualRole = this.aservice.role()

    if(!this.aservice.hasToken() || actualRole !== expectedRole) {
      alert('Nie masz uprawnień do przeglądania tej strony')
      if(actualRole == 'USER') {
        this.router.navigate(['/dashboard/wall'])
      } else if (actualRole == 'ADMIN') {
        this.router.navigate(['/admin'])
      } else {
        this.router.navigate(['/login'])
      }
      return false;
    }
    else {
      return true;
    }
  }
}
