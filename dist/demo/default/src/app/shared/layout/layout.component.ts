import { Component, OnInit, ViewEncapsulation } from '@angular/core'

@Component({
    selector: '.m-grid.m-grid--hor.m-grid--root.m-page',
    templateUrl: './layout.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class LayoutComponent implements OnInit {
    constructor() { }
    ngOnInit() { }
}
