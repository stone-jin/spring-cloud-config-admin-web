import {AjaxToastrService} from './../../../../shared/AjaxToastr/ajaxToastr.service';
import {OnInit, AfterViewInit} from '@angular/core';
import {Component} from '@angular/core';
import {ScriptLoaderService} from '../../../../_services/script-loader.service';
import {Ajax} from '../../../../shared/ajax/ajax.service';

declare let $: any;
declare let toastr: any;
declare let swal: any;
@Component({
    templateUrl: './env-params.component.html',
})
export class EnvParamsComponent implements OnInit, AfterViewInit {
    formData: any = {
        type: 'add',
        pKey: '',
        pValue: '',
    };
    dataList: any[] = [];
    datatable: any = null;
    queryParams: any = {};
    constructor(
        private _script: ScriptLoaderService,
        private ajax: Ajax,
        private ajaxToastr: AjaxToastrService
    ) {}

    ngAfterViewInit(): void {
        this.initData();
    }
    ngOnInit(): void {}

    async initData() {
        await this.initEnvList();
        await this.initEnvParamList();
        this.initFormValid();
    }

    async initEnvList() {
        let result = await this.ajax.get('/xhr/env');
        let selectData = result.map(item => {
            return {
                id: item.id,
                text: item.name,
            };
        });
        $('#m_select2_5').select2({
            placeholder: '请选择一个环境',
            data: selectData,
        });
        $('#m_select2_5').change(() => {
            this.reCreateTable();
        });
    }

    reCreateTable() {
        this.datatable.destroy();
        this.initEnvParamList();
    }

    reloadData() {
        let envParam = $('#m_select2_5').val();
        this.queryParams.envId = envParam;
        this.datatable.reload();
    }

    async initEnvParamList() {
        let envParam = $('#m_select2_5').val();
        // let result = await this.ajax.get('/xhr/envParam', {
        //     envId: envParam,
        // });
        this.queryParams.envId = envParam;
        var options = {
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: '/xhr/envParam',
                        method: 'GET',
                        params: this.queryParams,
                        map: function(raw) {
                            // sample data mapping
                            var dataSet = raw;
                            if (typeof raw.data !== 'undefined') {
                                dataSet = raw.data;
                            }
                            return dataSet;
                        },
                    },
                },
                pageSize: 10,
                saveState: {
                    cookie: true,
                    webstorage: true,
                },

                serverPaging: false,
                serverFiltering: false,
                serverSorting: false,
                autoColumns: false,
            },

            layout: {
                theme: 'default',
                class: 'm-datatable--brand',
                scroll: true,
                height: null,
                footer: false,
                header: true,

                smoothScroll: {
                    scrollbarShown: true,
                },

                spinner: {
                    overlayColor: '#000000',
                    opacity: 0,
                    type: 'loader',
                    state: 'brand',
                    message: true,
                },

                icons: {
                    sort: {asc: 'la la-arrow-up', desc: 'la la-arrow-down'},
                    pagination: {
                        next: 'la la-angle-right',
                        prev: 'la la-angle-left',
                        first: 'la la-angle-double-left',
                        last: 'la la-angle-double-right',
                        more: 'la la-ellipsis-h',
                    },
                    rowDetail: {
                        expand: 'fa fa-caret-down',
                        collapse: 'fa fa-caret-right',
                    },
                },
            },

            sortable: true,

            pagination: true,

            search: {
                // enable trigger search by keyup enter
                onEnter: false,
                // input text for search
                input: $('#generalSearch'),
                // search delay in milliseconds
                delay: 200,
            },

            rows: {
                callback: function() {},
                // auto hide columns, if rows overflow. work on non locked columns
                autoHide: false,
            },

            // columns definition
            columns: [
                // {
                //     field: 'id',
                //     title: 'id',
                //     width: 80,
                //     textAlign: 'center',
                //     overflow: 'visible',
                //     template: '{{id}}',
                // },
                {
                    field: 'pKey',
                    title: '配置key',
                    sortable: 'asc',
                    filterable: false,
                    width: 300,
                    responsive: {visible: 'lg'},
                    template: '{{pKey}}',
                },
                {
                    field: 'pValue',
                    title: '配置value',
                    width: 300,
                    overflow: 'visible',
                    template: '{{pValue}}',
                },
                {
                    field: 'envParams',
                    title: '操作',
                    sortable: false,
                    width: 100,
                    overflow: 'visible',
                    template: `<div class="item-operate" data-info={{id}}>
                        <a class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill modifyItem" title="View">
                          <i class="la la-edit"></i>
                        </a>
                        <a class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill deleteItem" title="View">
                          <i class="la la-trash"></i>
                        </a></div>`,
                },
            ],

            toolbar: {
                layout: ['pagination', 'info'],

                placement: ['bottom'], //'top', 'bottom'

                items: {
                    pagination: {
                        type: 'default',

                        pages: {
                            desktop: {
                                layout: 'default',
                                pagesNumber: 6,
                            },
                            tablet: {
                                layout: 'default',
                                pagesNumber: 3,
                            },
                            mobile: {
                                layout: 'compact',
                            },
                        },

                        navigation: {
                            prev: true,
                            next: true,
                            first: true,
                            last: true,
                        },

                        pageSizeSelect: [10, 20, 30, 50, 100],
                    },

                    info: true,
                },
            },

            translate: {
                records: {
                    processing: '正在获取环境列表',
                    noRecords: '当前还没有配置环境',
                },
                toolbar: {
                    pagination: {
                        items: {
                            default: {
                                first: '首页',
                                prev: '上一页',
                                next: '下一页',
                                last: '末页',
                                more: '更多页',
                                input: 'Page number',
                                select: '请选择每页显示数量',
                            },
                            info:
                                '显示第 {{start}} - {{end}} 条记录，总共 {{total}} 条',
                        },
                    },
                },
            },
        };
        this.datatable = (<any>$('#m_datatable')).mDatatable(options);
        let self = this;
        $('#m_datatable').on('click', '.deleteItem', event => {
            let id = $(event.target)
                .parents('.item-operate')
                .attr('data-info');
            self.deleteEnv(id);
        });
        $('#m_datatable').on('click', '.modifyItem', event => {
            let id = $(event.target)
                .parents('.item-operate')
                .attr('data-info');
            self.editEnv(id);
        });
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

        $('#env-params-form').validate({
            // define validation rules
            rules: {
                pKey: {
                    required: true,
                },
                pValue: {
                    required: true,
                },
            },

            //display error alert on form submit
            invalidHandler: function(event, validator) {
                console.log(event);
            },

            submitHandler: form => {
                this.saveModal();
            },
        });
    }

    async deleteEnv(id) {
        swal({
            title: 'Are you sure?',
            text: '你确定删除这个环境参数吗？',
            type: 'warning',
            showCancelButton: !0,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
        }).then(async e => {
            if (e.value) {
                try {
                    let result = await this.ajax.delete(
                        '/xhr/envParam?id=' + id,
                        {}
                    );
                    toastr.success('删除环境参数成功!');
                    this.reloadData();
                } catch (e) {
                    this.ajaxToastr.error(e, '删除环境参数失败!');
                }
            }
        });
    }

    async editEnv(id) {
        let allData = this.datatable.getColumn(id).originalDataSet;
        let result = allData.filter(item => {
            if (item.id == id) {
                return true;
            } else {
                return false;
            }
        });
        this.formData.type = 'edit';
        this.formData.pKey = result[0].pKey;
        this.formData.pValue = result[0].pValue;
        this.formData.id = id;
        $('#m_modal_1').modal('show');
    }

    createEnvParam() {
        this.formData.pKey = '';
        this.formData.pValue = '';
        this.formData.type = 'add';
        $('#m_modal_1').modal('show');
    }

    closeModal() {
        $('#m_modal_1').modal('hide');
    }

    async saveModal() {
        if (this.formData.type === 'add') {
            try {
                let params = {
                    pKey: this.formData.pKey,
                    pValue: this.formData.pValue,
                };
                let result = await this.ajax.post(
                    '/xhr/envParam?envId=' + $('#m_select2_5').val(),
                    params
                );
                toastr.success('新增环境成功!');
                $('#m_modal_1').modal('hide');
                this.reloadData();
            } catch (e) {
                this.ajaxToastr.error(e, '新增环境失败!');
            }
        } else {
            try {
                let params = {
                    pKey: this.formData.pKey,
                    pValue: this.formData.pValue,
                    id: this.formData.id,
                };
                let result = await this.ajax.put('/xhr/envParam', params);
                toastr.success('编辑环境成功!');
                $('#m_modal_1').modal('hide');
                this.reloadData();
            } catch (e) {
                this.ajaxToastr.error(e, '编辑环境失败!');
            }
        }
    }
}
