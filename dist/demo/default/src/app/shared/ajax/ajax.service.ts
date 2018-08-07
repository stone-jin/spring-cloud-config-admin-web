import {Http} from '@angular/http';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class Ajax {
    constructor(private httpClient: HttpClient, private _router: Router) {}

    async get(url, params?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpClient.get(url, {params: params}).subscribe(
                async (result: any) => {
                    await this.logout(result)
                    resolve(result.data);
                },
                (error: any) => {
                    console.log('====>', error);
                    reject(error);
                }
            );
        });
    }

    async post(url, params?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpClient.post(url, params).subscribe(
                async (result: any) => {
                    await this.logout(result)
                    resolve(result.data);
                },
                (error: any) => {
                    console.log('====>', error);
                    reject(error);
                }
            );
        });
    }

    async logout(result){
        if (result.code == 401) {
            localStorage.removeItem('currentUser');
            try {
                let result = await this.get('/logout', {});
            } catch (e) {
                this._router.navigate(['/login'], {
                    queryParams: {returnUrl: '/index'},
                });
            }
        }
    }

    async postForm(url, params?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            let httpParams = new HttpParams();
            let keys = Object.keys(params);
            for (let i = 0; i < keys.length; i++) {
                httpParams = httpParams.set(keys[i], params[keys[i]]);
            }
            this.httpClient
                .post(url, httpParams, {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }),
                })
                .subscribe(
                    async (result: any) => {
                        await this.logout(result)
                        resolve(result.data);
                    },
                    (error: any) => {
                        console.log('====>', error);
                        if (error.url == 'http://localhost:4200/login?error') {
                            reject('登录失败');
                        } else {
                            console.log('====>登录成功');
                            resolve();
                        }
                    }
                );
        });
    }

    async put(url, params?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpClient.put(url, params).subscribe(
                async (result: any) => {
                    await this.logout(result)
                    resolve(result.data);
                },
                (error: any) => {
                    console.log('====>', error);
                    reject(error);
                }
            );
        });
    }

    async delete(url, params?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpClient.delete(url, {params: params}).subscribe(
                async (result: any) => {
                    await this.logout(result)
                    resolve({});
                },
                (error: any) => {
                    console.log('====>', error);
                    reject(error);
                }
            );
        });
    }
}
