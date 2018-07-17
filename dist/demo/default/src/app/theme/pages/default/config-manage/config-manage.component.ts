import {OnInit} from '@angular/core';
import {Component} from '@angular/core';
import {Ajax} from '../../../../shared/ajax/ajax.service';

declare let toastr: any;
declare let swal: any;
declare let $: any;
declare let mApp: any;
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
    configFromConfigServerList: any[] = [];
    constructor(private ajax: Ajax) {}

    ngOnInit(): void {
        this.initProductList();
    }

    ngAfterViewInit(): void {
        this.initFormValidation();
    }

    initFormValidation() {
        /*
        * Translated default messages for the jQuery validation plugin.
        * Locale: ZH (Chinese, 中文 (Zhōngwén), 汉语, 漢語)
        */
        $.extend($.validator.messages, {
            required: '这是必填字段',
            remote: '请修正此字段',
            email: '请输入有效的电子邮件地址',
            url: '请输入有效的网址',
            date: '请输入有效的日期',
            dateISO: '请输入有效的日期 (YYYY-MM-DD)',
            number: '请输入有效的数字',
            digits: '只能输入数字',
            creditcard: '请输入有效的信用卡号码',
            equalTo: '你的输入不相同',
            extension: '请输入有效的后缀',
            maxlength: $.validator.format('最多可以输入 {0} 个字符'),
            minlength: $.validator.format('最少要输入 {0} 个字符'),
            rangelength: $.validator.format(
                '请输入长度在 {0} 到 {1} 之间的字符串'
            ),
            range: $.validator.format('请输入范围在 {0} 到 {1} 之间的数值'),
            max: $.validator.format('请输入不大于 {0} 的数值'),
            min: $.validator.format('请输入不小于 {0} 的数值'),
        });

        $('#id-config-manage-form').validate({
            //display error alert on form submit
            invalidHandler: function(event, validator) {
                console.log(event);
            },

            submitHandler: form => {
                this.save();
            },
        });
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
        this.selectLabelInfo = this.selectProductInfo.labels.filter(item => {
            if (item.id === this.selectLabelId) {
                return true;
            }
        })[0];
        await this.getEnvParamsTemplate();
        await this.getEncrptKeyList();
        await this.getPersistentList();
    }

    /**
     * 选中对应的环境
     * @param id 环境的id
     * @author stone-jin, https://www.520stone.com
     */
    async selectEnv(id) {
        this.selectEnvId = id;
        this.selectEnvInfo = this.selectProductInfo.envs.filter(item => {
            if (item.id === this.selectEnvId) {
                return true;
            }
        })[0];
        await this.getEnvParamsTemplate();
        await this.getEncrptKeyList();
        await this.getPersistentList();
    }

    /**
     * 根据当前项目名称，环境名称，版本名称获取当前的存储配置信息
     * @author stone-jin, https://www.520stone.com
     */
    async getPersistentList() {
        let params = {
            project: this.selectProductInfo.name,
            profile: this.selectEnvInfo.name,
            label: this.selectLabelInfo.name,
        };
        let result = await this.ajax.get('/xhr/property/persistent', params);
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

    /**
     * 配置中心获取存储配置
     * @author stone-jin, https://www.520stone.com
     */
    async getFromConfigServer() {
        try {
            let result = await this.ajax.get('/xhr/property/configServer', {
                project: this.selectProductInfo.name,
                profile: this.selectEnvInfo.name,
                label: this.selectLabelInfo.name,
            });

            $('#m_modal_1').modal('show');
            let tmp = result.filter(item => {
                if (
                    item.name.substring(item.name.lastIndexOf('-') + 1) ===
                        this.selectEnvInfo.name &&
                    item.name.substring(0, item.name.lastIndexOf('-')) ===
                        this.selectProductInfo.name
                ) {
                    return true;
                } else {
                    return false;
                }
            })[0].source;
            let keys = Object.keys(tmp);
            this.configFromConfigServerList = [];
            keys.map(item => {
                this.configFromConfigServerList.push({
                    name: item,
                    value: tmp[item],
                });
            });
            console.log(result);
        } catch (e) {
            console.log(e);
            toastr.error('配置中心获取存储配置失败');
        }
    }

    /**
     * 保存存储配置信息
     */
    async save() {
        try {
            let params = {};
            for (let i = 0; i < this.persistent.length; i++) {
                params[this.persistent[i].key] = this.persistent[i].value;
                if (
                    this.persistent[i].key === '' ||
                    this.persistent[i].value === ''
                ) {
                    toastr.error('当前存储配置不能为空，请进行补全!');
                    return;
                }
            }
            let url = `?project=${this.selectProductInfo.name}&profile=${
                this.selectEnvInfo.name
            }&label=${this.selectLabelInfo.name}`;
            let result = await this.ajax.post(
                '/xhr/property/persistent' + url,
                params
            );
            toastr.success('保存存储配置信息成功!');
        } catch (e) {
            toastr.error('保存存储配置信息失败!');
        }
    }

    getEncrpytStatus(item) {
        if (item.value.indexOf('{cipher}') >= 0) {
            return '1';
        } else {
            return '0';
        }
    }

    /**
     * 加密
     * @param item 配置项
     */
    async lock(item) {
        mApp.block('#persistentList', {});
        mApp.block('#envParamsList', {});
        try {
            let result = await this.ajax.post(
                '/xhr/property/encrypt?envId=' +
                    this.selectEnvId +
                    '&value=' +
                    item.value,
                {}
            );
            item.value = '{cipher}' + result;
            toastr.success('加密成功!');
        } catch (e) {
            toastr.error('加密失败!');
        }
        mApp.unblock('#persistentList');
        mApp.unblock('#envParamsList');
    }

    /**
     * 解密
     * @param item 配置项
     */
    async unlock(item) {
        mApp.block('#persistentList', {});
        mApp.block('#envParamsList', {});
        try {
            let result = await this.ajax.post(
                '/xhr/property/decrypt?envId=' +
                    this.selectEnvId +
                    '&value=' +
                    item.value.substring('{cipher}'.length),
                {}
            );
            item.value = result;
            toastr.success('解密成功!');
        } catch (e) {
            toastr.error('解密失败!');
        }
        mApp.unblock('#persistentList');
        mApp.unblock('#envParamsList');
    }

    /**
     * 删除配置项
     * @param index
     */
    deleteItem(index) {
        swal({
            title: 'Are you sure?',
            text: '你确定删除这个配置参数吗？',
            type: 'warning',
            showCancelButton: !0,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
        }).then(async e => {
            if (e.value) {
                this.persistent.splice(index, 1);
            }
        });
    }

    /**
     * 替换
     * @param item
     */
    replaceItem(item) {
        for (let i = 0; i < this.persistent.length; i++) {
            if (this.persistent[i].key === item.pKey) {
                this.persistent[i].value = item.pValue;
                this.save();
                return;
            }
        }
    }

    /**
     * 一键替换
     */
    allReplace() {
        for (let i = 0; i < this.envParamsTemList.length; i++) {
            for (let j = 0; j < this.persistent.length; j++) {
                if (this.persistent[j].key === this.envParamsTemList[i].pKey) {
                    this.persistent[j].value = this.envParamsTemList[i].pValue;
                }
            }
        }

        this.save();
    }

    /**
     * 一键加密
     */
    allLock() {
        mApp.block('#persistentList', {});
        for (let j = 0; j < this.encryptKeyList.length; j++) {
            for (let i = 0; i < this.persistent.length; i++) {
                if (this.encryptKeyList[j].eKey === this.persistent[i].key) {
                    if (this.persistent[i].value.indexOf('{cipher}') < 0) {
                        this.lock(this.persistent[i]);
                        break;
                    }
                }
            }
        }
        mApp.unblock('#persistentList');
    }

    /**
     *是否能被替换
     * @param {*} item
     * @returns
     * @memberof ConfigManageComponent
     */
    fCanReplace(item) {
        let result = this.persistent.filter(item => {
            if (item.key == item.key) {
                return true;
            } else {
                return false;
            }
        });
        if (result.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 新增配置
     */
    addConfig() {
        this.persistent.push({
            key: '',
            value: '',
        });
    }
}
