import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import { User } from '../_models/index';
import { Ajax } from '../../shared/ajax/ajax.service';

@Injectable()
export class UserService {
    constructor(private http: Http, private ajax: Ajax) { }

    async verify() {
        return await this.ajax.get('/xhr/user', {});
    }

    forgotPassword(email: string) {
        return this.http
            .post('/api/forgot-password', JSON.stringify({ email }), this.jwt())
            .subscribe((res: any)=>{
                res.data
            })
    }

    getAll() {
        return this.http
            .get('/api/users', this.jwt())
            .subscribe((res: any)=>{
                res.data
            })
    }

    getById(id: number) {
        return this.http
            .get('/api/users/' + id, this.jwt())
            .subscribe((res: any)=>{
                res.data
            })
    }

    update(user: User) {
        return this.http
            .put('/api/users/' + user.id, user, this.jwt())
            .subscribe((res: any)=>{
                res.data
            })
    }

    delete(id: number) {
        return this.http
            .delete('/api/users/' + id, this.jwt()).subscribe((res: any)=>{
                res.data
            })
            // .map((response: Response) => response.json());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({
                Authorization: 'Bearer ' + currentUser.token,
            });
            return new RequestOptions({ headers: headers });
        }
    }
}
