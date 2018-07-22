import { Component, OnInit, ViewEncapsulation } from '@angular/core'

@Component({
    selector:
    '.m-grid__item.m-grid__item--fluid.m-grid.m-grid--ver-desktop.m-grid--desktop.m-body',
    templateUrl: './default.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class DefaultComponent implements OnInit {
    constructor() { }
    ngOnInit() { }
}
