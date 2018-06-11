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
        this.initData()
    }
    ngOnInit(): void {}

    async initData() {
        await this.initEnvList()
        await this.initEnvParamList()
    }

    async initEnvList() {
        let result = await this.ajax.get('/xhr/env')
        let selectData = result.map(item => {
            return {
                id: item.id,
                text: item.name,
            }
        })
        $('#m_select2_5').select2({
            placeholder: '请选择一个环境',
            data: selectData,
        })
        $('#m_select2_5').change(() => {
            this.initEnvParamList()
        })
    }

    async initEnvParamList() {
        let envParam = $('#m_select2_5').val()
        let result = await this.ajax.get('/xhr/envParam', {
            envId: envParam,
        })
        console.log(result)
    }
}
