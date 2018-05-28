import {OnInit, AfterViewInit} from '@angular/core'
import {Component} from '@angular/core'
import {ScriptLoaderService} from '../../../../_services/script-loader.service'
import {Ajax} from '../../../../shared/ajax/ajax.service'

declare let $: any
@Component({
    templateUrl: './env-params.component.html',
})
export class EnvParamsComponent implements OnInit, AfterViewInit {
    formData: any = {
        configServerName: '',
        registryAddress: '',
        envName: '',
    }
    dataList: any[] = []
    datatable: any = null
    constructor(private _script: ScriptLoaderService, private ajax: Ajax) {}

    ngAfterViewInit(): void {
        this.initEnvList()
    }
    ngOnInit(): void {}

    async initEnvList() {
        $('#m_select2_5').select2({
            placeholder: '请选择一个环境',
            data: [
                {
                    id: 0,
                    text: '测试服',
                },
                {
                    id: 1,
                    text: '线上服',
                },
                {
                    id: 2,
                    text: '压测服',
                },
                {
                    id: 3,
                    text: '预发布服',
                },
                {
                    id: 4,
                    text: '开发服',
                },
            ],
        })
    }
}
