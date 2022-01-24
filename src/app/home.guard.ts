import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

/** Guard for protective access for person younger than 18 years */
@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {

  constructor(
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    let answ = prompt('how old are you?', '');
    if(Number(answ) > 17) {
      return true;
    } else {
      this.router.navigate(['/fail']);
      return false;
    }
  }
}
