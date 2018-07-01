import {OnInit} from '@angular/core';
import {Component} from '@angular/core';
import {Ajax} from '../../../../shared/ajax/ajax.service';

@Component({
    templateUrl: './config-manage.component.html',
})
export class ConfigManageComponent implements OnInit {
    productList: any[] = [];
    selectProductId: any = null;
    selectProductInfo: any = null;
    envs: any[] = [];
    labels: any[] = [];
    selectEnvId: any = null;
    selectEnvInfo: any = null;
    selectLabelId: any = null;
    selectLabelInfo: any = null;
    envParamsTemList: any[] = [];
    encryptKeyList: any[] = [];
    persistentList: any[] = [];
    persistent: any[] = [];
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
        this.selectProduct(this.selectProductId);
    }

    async selectProduct(id) {
        this.selectProductId = id;
        this.selectProductInfo = this.productList.filter(item => {
            if (this.selectProductId == item.id) {
                return true;
            }
        })[0];
        this.envs = this.selectProductInfo.envs;
        if (this.envs.length > 0) {
            this.selectEnvId = this.envs[0].id;
            this.selectEnvInfo = this.envs[0];
        }
        this.labels = this.selectProductInfo.labels;
        if (this.labels.length > 0) {
            this.selectLabelId = this.labels[0].id;
            this.selectLabelInfo = this.labels[0];
        }
        await this.getEnvParamsTemplate();
        await this.getEncrptKeyList();
        await this.getPersistentList();
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
     * 加密Key清单
     * @author stone-jin, https://www.520stone.com
     */
    async getEncrptKeyList() {
        let result = await this.ajax.get('/xhr/encryptKey', {});
        this.encryptKeyList = result;
    }

    /**
     * 选中对应的版本
     * @param id 版本的id
     * @author stone-jin, https://www.520stone.com
     */
    async selectLabel(id) {
        this.selectLabelId = id;
        await this.getEnvParamsTemplate();
        await this.getEncrptKeyList();
    }

    /**
     * 选中对应的环境
     * @param id 环境的id
     * @author stone-jin, https://www.520stone.com
     */
    async selectEnv(id) {
        this.selectEnvId = id;
        await this.getEnvParamsTemplate();
    }

    /**
     * 根据当前项目名称，环境名称，版本名称获取当前的存储配置信息
     */
    async getPersistentList() {
        let result = await this.ajax.get('/xhr/property/persistent', {
            project: this.selectProductInfo.name,
            profile: this.selectEnvInfo.name,
            label: this.selectLabelInfo.name,
        });
        this.persistentList = result;
        this.persistent = [];
        let keys = Object.keys(this.persistentList);
        for (let i = 0; i < keys.length; i++) {
            this.persistent.push({
                key: keys[i],
                value: this.persistentList[keys[i]],
            });
        }
    }
}
