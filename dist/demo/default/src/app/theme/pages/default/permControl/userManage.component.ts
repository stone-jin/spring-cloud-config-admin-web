import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router'
import { Ajax } from '../../../../shared/ajax/ajax.service';

@Component({
    selector: '.m-wrapper',
    templateUrl: './userManage.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class UserManageComponent implements OnInit {
    userInfo: any = {}
    datatable: any
    constructor(
        private router: Router,
        private ajax: Ajax
    ) {}

    ngOnInit() {
        this.checkUserPerm()
    }

    /**
     * 校验用户是否能查看这个页面
     */
    async checkUserPerm(){
         this.userInfo = await this.ajax.get('/xhr/user', {});
         if(this.userInfo.role != 1){
             this.router.navigate(['/index'])
         }
    }

    ngAfterViewInit(): void {
        this.dataTableInit();
    }

    dataTableInit() {
        var options = {
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: '/xhr/encryptKey',
                        method: 'GET',
                        params: {},
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
                    sort: { asc: 'la la-arrow-up', desc: 'la la-arrow-down' },
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
                callback: function() { },
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
                    field: 'eKey',
                    title: 'eKey',
                    sortable: 'asc',
                    filterable: false,
                    width: 300,
                    responsive: { visible: 'lg' },
                    template: '{{eKey}}',
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
                    processing: '正在获取加密key列表',
                    noRecords: '当前还没有配置加密key',
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
    }
}
