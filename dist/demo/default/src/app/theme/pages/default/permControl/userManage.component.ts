import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {Ajax} from '../../../../shared/ajax/ajax.service';

declare let swal: any;
declare let toastr: any;
declare let $: any;

@Component({
    selector: '.m-wrapper',
    templateUrl: './userManage.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class UserManageComponent implements OnInit {
    userInfo: any = {};
    datatable: any;
    formData: any = {};
    constructor(private router: Router, private ajax: Ajax) {}

    ngOnInit() {
        this.checkUserPerm();
    }

    /**
     * 校验用户是否能查看这个页面
     */
    async checkUserPerm() {
        this.userInfo = await this.ajax.get('/xhr/user', {});
        if (this.userInfo.role != 1) {
            this.router.navigate(['/index']);
        }
    }

    ngAfterViewInit(): void {
        this.dataTableInit();
        this.initFormValid();
    }

    dataTableInit() {
        var options = {
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: '/xhr/admin/list',
                        method: 'GET',
                        params: {},
                        map: function(raw) {
                            // sample data mapping
                            var dataSet = raw;
                            if (typeof raw.data !== 'undefined') {
                                dataSet = raw.data;
                            }
                            console.log(dataSet);
                            return dataSet.content;
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
                {
                    field: 'username',
                    title: '账号',
                    sortable: 'asc',
                    filterable: false,
                    width: 300,
                    responsive: {visible: 'lg'},
                    template: '{{username}}',
                },
                {
                    field: 'nickname',
                    title: '用户名',
                    sortable: 'asc',
                    filterable: false,
                    width: 300,
                    responsive: {visible: 'lg'},
                    template: '{{nickname}}',
                },
                {
                    field: 'role',
                    title: '角色',
                    sortable: 'asc',
                    filterable: false,
                    width: 300,
                    responsive: {visible: 'lg'},
                    template: function(row) {
                        return row.role == 1 ? '超级管理员' : '普通成员';
                    },
                },
                {
                    field: 'envParams',
                    title: '操作',
                    sortable: false,
                    width: 100,
                    overflow: 'visible',
                    template: `<div class="item-operate" data-info={{username}}>
                        <a class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill modifyItem" title="编辑">
                          <i class="la la-edit"></i>
                        </a>
                        <a class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill deleteItem" title="删除">
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
                    processing: '正在获取用户列表',
                    noRecords: '当前还没有添加用户',
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
        let self = this;
        this.datatable = (<any>$('#m_datatable')).mDatatable(options);
        $('#m_datatable').on('click', '.deleteItem', event => {
            let username = $(event.target)
                .parents('.item-operate')
                .attr('data-info');
            self.deleteUser(username);
        });
        $('#m_datatable').on('click', '.modifyItem', event => {
            let username = $(event.target)
                .parents('.item-operate')
                .attr('data-info');
            self.editUser(username);
        });
    }

    deleteUser(username) {
        swal({
            title: 'Are you sure?',
            text: '你确定删除这个用户吗？',
            type: 'warning',
            showCancelButton: !0,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
        }).then(async e => {
            if (e.value) {
                let params = {
                    username: username,
                };
                try {
                    let result = await this.ajax.delete('/xhr/admin', params);
                    toastr.success('删除用户成功!');
                    this.datatable.reload();
                } catch (e) {
                    toastr.error('删除用户失败!');
                }
            }
        });
    }

    editUser(username) {
        let allData = this.datatable.getColumn(username).originalDataSet;
        let result = allData.filter(item => {
            if (item.username == username) {
                return true;
            } else {
                return false;
            }
        });
        this.formData = {
            username: username,
            nickname: result[0].nickname,
            password: result[0].password,
            type: 'edit',
        };
        $('#m_modal_1').modal('show');
        console.log('=====>editEnv');
    }

    initFormValid() {
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

        // $('#user-create-form').validate({
        //     rules: {
        //         username: {
        //             required: true,
        //         },
        //         nickname: {
        //             required: true,
        //         },
        //         password: {
        //             required: true,
        //         },
        //     },

        //     //display error alert on form submit
        //     invalidHandler: function(event, validator) {
        //         console.log(event);
        //     },

        //     submitHandler: form => {
        //         //this.saveModal();
        //     },
        // });
    }

    createUser() {
        this.formData = {
            username: '',
            nickname: '',
            password: '',
            type: 'add',
        };
        $('#m_modal_1').modal('show');
    }

    async saveModal() {
        if (this.formData.type === 'add') {
            try {
                let params = {
                    username: this.formData.username,
                    nickname: this.formData.nickname,
                    password: this.formData.password,
                    role: 2,
                };
                let result = await this.ajax.post('/xhr/admin', params);
                toastr.success('新增用户成功!');
                $('#m_modal_1').modal('hide');
                this.reloadData();
            } catch (e) {
                toastr.error('新增用户失败!');
            }
        } else {
        }
    }

    reloadData() {
        this.datatable.reload();
    }

    closeModal() {
        $('#m_modal_1').modal('hide');
    }
}
