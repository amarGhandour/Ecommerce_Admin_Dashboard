import {Injectable} from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import {Observable} from 'rxjs';
import {AppService} from '@services/app.service';
import {Role} from "@/interfaces/role";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private appService: AppService, private toaster: ToastrService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.getProfile();
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.canActivate(next, state);
  }

  getProfile() {
    this.appService.setUserProfile();

    if (this.appService.user && this.appService.user.role == Role.Admin) {
      return true;
    }
    // try {
    //   this.appService.setUserProfile();
    //     return true;
    // } catch (error) {
    //     return false;
    // }
    this.toaster.error('Not Authorized');
    return this.router.navigate(['login']) || false;
  }
}
