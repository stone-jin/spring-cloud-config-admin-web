import { OnInit } from '@angular/core';
import { Component, AfterViewInit } from '@angular/core';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import { Ajax } from '../../../../shared/ajax/ajax.service';

declare let toastr: any;
declare let $: any;
declare let swal: any;
@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
})
export class ProductCompponent implements AfterViewInit, OnInit {
    formData: any = {
        name: '',
        labels: [],
        envs: [],
    };
    bInAdd: Boolean = false;
    dataList: any[] = [];
    datatable: any = null;
    label: String = '';
    envList: any[] = [];
    master: Boolean = false;
    constructor(private _script: ScriptLoaderService, private ajax: Ajax) { }

    ngOnInit(): void { }

    async initEnvList() {
        let result = await this.ajax.get('/xhr/env');
        result = result.map(item => {
            item.checked = false;
            return item;
        });
        this.envList = result;
        console.log(this.envList);
    }

    ngAfterViewInit(): void {
        this.initFormValid();
    }

    initFormValid() {
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

        $('#id-product-form').validate({
            // define validation rules
            rules: {
                productName: {
                    required: true,
                },
                productEnv: {
                    required: true,
                },
            },

            //display error alert on form submit
            invalidHandler: function(event, validator) {
                console.log(event);
            },

            submitHandler: form => {
                this.save();
            },
        });
    }

    async save() {
        if (this.formData.type !== 'edit') {
            try {
                let params = {
                    name: this.formData.name,
                    labels: this.formData.labels,
                    envs: this.envList
                        .filter(item => {
                            if (item.checked) {
                                return true;
                            }
                        })
                        .map(item => {
                            return {
                                id: item.id,
                            };
                        }),
                };
                let result = await this.ajax.post('/xhr/project', params);
                toastr.success('新增项目成功!');
                $('#m_modal_1').modal('hide');
                this.datatable.reload();
            } catch (e) {
                toastr.error('新增项目失败!');
            }
        } else {
            try {
                let params = {
                    id: this.formData.id,
                    name: this.formData.name,
                    labels: this.formData.labels,
                    envs: this.envList
                        .filter(item => {
                            if (item.checked) {
                                return true;
                            }
                        })
                        .map(item => {
                            return {
                                id: item.id,
                            };
                        }),
                };
                let result = await this.ajax.put('/xhr/project', params);
                toastr.success('更新项目成功!');
                $('#m_modal_1').modal('hide');
                this.datatable.reload();
            } catch (e) {
                toastr.error('更新项目失败!');
            }
        }
    }

    async createProduct() {
        this.formData = {
            name: '',
            labels: [
                {
                    name: 'master',
                },
            ],
            type: 'add',
        };
        this.initEnvList();
        $('#m_modal_1').modal('show');
    }

    async editProduct(id) {
        let allData = this.datatable.getColumn(id).originalDataSet;
        let result = allData.filter(item => {
            if (item.id == id) {
                return true;
            } else {
                return false;
            }
        });
        let envIds = result[0].envs.map(item => {
            return item.id;
        });
        this.formData = {
            id: id,
            name: result[0].name,
            type: 'edit',
            labels: result[0].labels,
        };
        await this.initEnvList();
        this.envList.map(item => {
            if (envIds.indexOf(item.id) >= 0) {
                item.checked = true;
            }
            return item;
        });
        $('#m_modal_1').modal('show');
    }

    async deleteEnv(id) {
        swal({
            title: 'Are you sure?',
            text: '你确定删除这个项目吗？',
            type: 'warning',
            showCancelButton: !0,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
        }).then(async e => {
            if (e.value) {
                let params = {
                    id: id,
                };
                try {
                    let result = await this.ajax.delete('/xhr/project', params);
                    toastr.success('删除项目成功!');
                    this.datatable.reload();
                } catch (e) {
                    toastr.error('删除项目失败!');
                }
            }
        });
    }

    addLabel() {
        this.bInAdd = true;
        this.label = '';
    }

    async addLabel2Array() {
        try {
            let result = await this.ajax.post(
                '/xhr/project/label?' +
                `projectId=${this.formData.id}&labelName=${this.label}`,
                {}
            );
            toastr.success('新增配置版本成功!');
            this.formData.labels.push({
                name: this.label,
                id: result.id,
            });
            this.bInAdd = false;
        } catch (e) {
            toastr.error('新增配置版本失败!');
        }
    }

    async remove(index) {
        try {
            let label = this.formData.labels.splice(index)[0];
            let result = await this.ajax.delete(
                `/xhr/project/label?labelId=${label.id}`,
                {}
            );
            toastr.success('删除配置版本成功!');
        } catch (e) {
            toastr.error('删除配置版本失败!');
        }
    }
}
