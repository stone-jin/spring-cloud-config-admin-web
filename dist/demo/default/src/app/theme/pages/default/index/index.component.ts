import {
    Component,
    OnInit,
    ViewEncapsulation,
    AfterViewInit,
} from '@angular/core'
import {Helpers} from '../../../../helpers'
import {ScriptLoaderService} from '../../../../_services/script-loader.service'

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
})
export class IndexComponent implements OnInit, AfterViewInit {
    services: any[] = [
        {
            serviceName: 'API网关',
            author: '金炳',
            createTime: '1天前',
        },
        {
            serviceName: 'Spring Boot Admin监控中心',
            author: '强强',
            createTime: '6天前',
        },
        {
            serviceName: '邮件报警中心',
            author: 'Anoyi',
            createTime: '11天前',
        },
        {
            serviceName: '日志服务中心',
            author: 'FangOba',
            createTime: '16天前',
        },
        {
            serviceName: 'Rancher平台',
            author: '金炳',
            createTime: '21天前',
        },
        {
            serviceName: 'Eureka服务注册与发现中心',
            author: '翟永超',
            createTime: '30天前',
        },
        {
            serviceName: 'API网关',
            author: '金炳',
            createTime: '1天前',
        },
        {
            serviceName: 'Spring Boot Admin监控中心',
            author: '强强',
            createTime: '6天前',
        },
        {
            serviceName: '邮件报警中心',
            author: 'Anoyi',
            createTime: '11天前',
        },
        {
            serviceName: '日志服务中心',
            author: 'FangOba',
            createTime: '16天前',
        },
        {
            serviceName: 'Rancher平台',
            author: '金炳',
            createTime: '21天前',
        },
        {
            serviceName: 'Eureka服务注册与发现中心',
            author: '翟永超',
            createTime: '30天前',
        },
    ]

    constructor(private _script: ScriptLoaderService) {}
    ngOnInit() {}
    ngAfterViewInit() {
        this._script.loadScripts('app-index', ['assets/app/js/dashboard.js'])
    }
}
