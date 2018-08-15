import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { UserService } from '../_services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private _router: Router, private _userService: UserService) { }

    async canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<boolean> {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        try {
            let result = await this._userService.verify();
            return true;
        } catch (e) {
            if (state.url != '/login') {
                this._router.navigate(['/login'], {
                    queryParams: { returnUrl: state.url },
                });
            } else {
                this._router.navigate(['/login']);
            }
            return false;
        }
    }
}
