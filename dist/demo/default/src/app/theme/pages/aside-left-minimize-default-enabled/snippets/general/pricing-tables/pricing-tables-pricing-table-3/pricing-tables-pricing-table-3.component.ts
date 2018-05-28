import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../../../../helpers';


@Component({
    selector: "app-pricing-tables-pricing-table-3",
    templateUrl: "./pricing-tables-pricing-table-3.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class PricingTablesPricingTable3Component implements OnInit, AfterViewInit {


    constructor() {

    }
    ngOnInit() {

    }
    ngAfterViewInit() {

        Helpers.bodyClass('m-page--fluid m--skin- m-content--skin-light2 m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-dark m-aside-left--offcanvas m-aside-left--minimize m-brand--minimize m-footer--push m-aside--offcanvas-default');

    }

}