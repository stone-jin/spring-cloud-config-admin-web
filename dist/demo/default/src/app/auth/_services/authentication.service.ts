import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Ajax } from '../../shared/ajax/ajax.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
    constructor(
        private http: Http,
        private ajax: Ajax,
        private _router: Router
    ) { }

    async login(email: string, password: string) {
        let result = await this.ajax.postForm('/xhr/login', {
            username: email,
            password: password,
        });
        console.log(result);

        let userInfo = await this.ajax.get('/xhr/user', {});
        localStorage.setItem('currentUser', JSON.stringify(userInfo));
    }

    async logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        try {
            let result = await this.ajax.get('/xhr/logout', {});
        } catch (e) {
            this._router.navigate(['/login'], {
                queryParams: { returnUrl: '/index' },
            });
        }
    }
}
