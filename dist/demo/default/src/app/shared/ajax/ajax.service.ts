import {Http} from '@angular/http';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class Ajax {
    constructor(private httpClient: HttpClient) {}

    async get(url, params?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpClient.get(url, {params: params}).subscribe(
                (result: any) => {
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
                (result: any) => {
                    resolve(result.data);
                },
                (error: any) => {
                    console.log('====>', error);
                    reject(error);
                }
            );
        });
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
                    (result: any) => {
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
                (result: any) => {
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
                (result: any) => {
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
