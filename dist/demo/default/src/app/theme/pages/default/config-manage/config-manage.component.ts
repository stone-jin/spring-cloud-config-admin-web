import {OnInit} from '@angular/core';
import {Component} from '@angular/core';
import {Ajax} from '../../../../shared/ajax/ajax.service';

@Component({
    templateUrl: './config-manage.component.html',
})
export class ConfigManageComponent implements OnInit {
    productList: any[] = [];
    selectProductId: any = null;
    envs: any[] = [];
    labels: any[] = [];
    selectEnvId: any = null;
    selectLabelId: any = null;
    envParamsTemList: any[] = [];
    constructor(private ajax: Ajax) {}

    ngOnInit(): void {
        this.initProductList();
    }

    async initProductList() {
        let result = await this.ajax.get('/xhr/project');
        this.productList = result;
        if (this.selectProductId == null) {
            this.selectProductId =
                this.productList.length > 0 ? this.productList[0].id : null;
        }
        await this.getEnvParamsTemplate();
    }

    async selectProduct(id) {
        this.selectProductId = id;
        let selectProduct = this.productList.filter(item => {
            if (this.selectProductId == item.id) {
                return true;
            }
        })[0];
        this.envs = selectProduct.envs;
        if (this.envs.length > 0) {
            this.selectEnvId = this.envs[0].id;
        }
        this.labels = selectProduct.labels;
        if (this.labels.length > 0) {
            this.selectLabelId = this.labels[0].id;
        }
        await this.getEnvParamsTemplate();
    }

    /**
     * 根据环境参数获取当前环境中的一些模板信息
     * @author stone-jin, https://www.520stone.com
     */
    async getEnvParamsTemplate() {
        let result = await this.ajax.get('/xhr/envParam', {
            envId: this.selectEnvId,
        });
        this.envParamsTemList = result;
    }

    /**
     * 选中对应的版本
     * @param id 版本的id
     * @author stone-jin, https://www.520stone.com
     */
    selectLabel(id) {
        this.selectLabelId = id;
    }

    /**
     * 选中对应的环境
     * @param id 环境的id
     * @author stone-jin, https://www.520stone.com
     */
    selectEnv(id) {
        this.selectEnvId = id;
    }
}
