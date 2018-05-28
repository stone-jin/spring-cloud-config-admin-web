import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'

@Injectable()
export class Ajax {
    constructor(private httpClient: HttpClient) {}

    async get(url, params?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpClient.get(url, {params: params}).subscribe(
                (result: any) => {
                    resolve(result.data)
                },
                (error: any) => {
                    console.log('====>', error)
                    reject(error)
                }
            )
        })
    }

    async post(url, params?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpClient.post(url, params).subscribe(
                (result: any) => {
                    resolve(result.data)
                },
                (error: any) => {
                    console.log('====>', error)
                    reject(error)
                }
            )
        })
    }

    async put(url, params?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpClient.put(url, params).subscribe(
                (result: any) => {
                    resolve(result.data)
                },
                (error: any) => {
                    console.log('====>', error)
                    reject(error)
                }
            )
        })
    }

    async delete(url, params?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpClient.delete(url, {params: params}).subscribe(
                (result: any) => {
                    resolve(result.data)
                },
                (error: any) => {
                    console.log('====>', error)
                    reject(error)
                }
            )
        })
    }
}
