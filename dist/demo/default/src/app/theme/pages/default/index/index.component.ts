import {
    Component,
    OnInit,
    ViewEncapsulation,
    AfterViewInit,
} from '@angular/core';
import {Helpers} from '../../../../helpers';
import {ScriptLoaderService} from '../../../../_services/script-loader.service';

declare let $: any;

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
})
export class IndexComponent implements OnInit, AfterViewInit {
    services: any[] = [];
    modalData: any = {
        url: '',
        encryptStatus: 'OK',
    };
    modalUrl: string = '';
    datatable: any;
    // services: any[] = [
    //     {
    //         serviceName: 'API网关',
    //         author: '金炳',
    //         createTime: '1天前',
    //     },
    //     {
    //         serviceName: 'Spring Boot Admin监控中心',
    //         author: '强强',
    //         createTime: '6天前',
    //     },
    //     {
    //         serviceName: '邮件报警中心',
    //         author: 'Anoyi',
    //         createTime: '11天前',
    //     },
    //     {
    //         serviceName: '日志服务中心',
    //         author: 'FangOba',
    //         createTime: '16天前',
    //     },
    //     {
    //         serviceName: 'Rancher平台',
    //         author: '金炳',
    //         createTime: '21天前',
    //     },
    //     {
    //         serviceName: 'Eureka服务注册与发现中心',
    //         author: '翟永超',
    //         createTime: '30天前',
    //     },
    //     {
    //         serviceName: 'API网关',
    //         author: '金炳',
    //         createTime: '1天前',
    //     },
    //     {
    //         serviceName: 'Spring Boot Admin监控中心',
    //         author: '强强',
    //         createTime: '6天前',
    //     },
    //     {
    //         serviceName: '邮件报警中心',
    //         author: 'Anoyi',
    //         createTime: '11天前',
    //     },
    //     {
    //         serviceName: '日志服务中心',
    //         author: 'FangOba',
    //         createTime: '16天前',
    //     },
    //     {
    //         serviceName: 'Rancher平台',
    //         author: '金炳',
    //         createTime: '21天前',
    //     },
    //     {
    //         serviceName: 'Eureka服务注册与发现中心',
    //         author: '翟永超',
    //         createTime: '30天前',
    //     },
    // ]

    constructor(private _script: ScriptLoaderService) {}
    ngOnInit() {}
    ngAfterViewInit() {
        this._script.loadScripts('app-index', ['assets/app/js/dashboard.js']);
        this.dataTableInit();
    }

    dataTableInit() {
        var options = {
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: '/xhr/dashboard/envSummary',
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
                scroll: false,
                height: null,
                footer: false,
                header: true,

                smoothScroll: {
                    scrollbarShown: false,
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
                    field: 'name',
                    title: '环境名称',
                    sortable: 'asc',
                    filterable: false,
                    responsive: {visible: 'lg'},
                    template: '{{name}}',
                },
                {
                    field: 'configServers',
                    title: '配置中心状态',
                    sortable: 'asc',
                    filterable: false,
                    responsive: {visible: 'lg'},
                    template: function(row) {
                        let envs = '';
                        envs = row.configServers.reduce((total, item) => {
                            return total + item.encryptStatus === 'OK'
                                ? `<span class="m-badge m-badge--success m-badge--wide" style="margin-right: 15px;" data-url="${
                                      item.url
                                  }" data-id="${row.id}">
                                </span>`
                                : `<span class="m-badge m-badge--danger m-badge--wide" style="margin-right: 15px;"  data-url="${
                                      item.url
                                  }" data-id="${row.id}">
                                    </span>`;
                        }, envs);
                        return envs;
                    },
                },
                {
                    field: 'params',
                    title: '环境参数项',
                    sortable: 'asc',
                    filterable: false,
                    responsive: {visible: 'lg'},
                    template: '{{params}}',
                },
                {
                    field: 'projects',
                    title: '部署项目数',
                    sortable: false,
                    overflow: 'visible',
                    template: '{{projects}}',
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
        let self = this;
        this.datatable = (<any>$('#m_datatable')).mDatatable(options);
        $('#m_datatable').on('click', '.m-badge', event => {
            let url = $(event.target).attr('data-url');
            let id = $(event.target).attr('data-id');
            self.showConfigServer(id, url);
        });
    }

    showConfigServer(id, url) {
        let allData = this.datatable.getColumn(0).originalDataSet;
        let result = allData.filter(item => {
            if (item.id == id) {
                return true;
            } else {
                return false;
            }
        });
        this.modalData = result[0].configServers.filter(item => {
            if (item.url === url) {
                return true;
            } else {
                return false;
            }
        })[0];
        console.log(this.modalData);
        $('#m_modal_1').modal('show');
    }
}
