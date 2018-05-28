import {
    Component,
    OnInit,
    ViewEncapsulation,
    AfterViewInit,
} from '@angular/core'

declare let mLayout: any
@Component({
    selector: 'app-header-nav',
    templateUrl: './header-nav.component.html',
    styleUrls: ['./header-nav.component.scss'],
})
export class HeaderNavComponent implements OnInit, AfterViewInit {
    constructor() {}
    ngOnInit() {}
    ngAfterViewInit() {
        mLayout.initHeader()
    }
}
