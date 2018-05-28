import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../../../../helpers';


@Component({
    selector: ".m-grid.m-grid--hor.m-grid--root.m-page",
    templateUrl: "./errors-error-1.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class ErrorsError1Component implements OnInit, AfterViewInit {


    constructor() {

    }
    ngOnInit() {

    }
    ngAfterViewInit() {

        Helpers.bodyClass('m--skin- m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-dark m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default');

    }

}