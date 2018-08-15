import {
    Component,
    OnInit,
    ViewEncapsulation,
    AfterViewInit,
} from '@angular/core';
import { Helpers } from '../../helpers';
import { Ajax } from '../ajax/ajax.service';

declare let mLayout: any;

@Component({
    selector: 'app-aside-nav',
    templateUrl: './aside-nav.component.html',
})
export class AsideNavComponent implements OnInit, AfterViewInit {
    userInfo: any;
    constructor(private ajax: Ajax) { }
    ngOnInit() {
        this.getUserInfo();
    }

    async getUserInfo() {
        this.userInfo = await this.ajax.get('/xhr/user', {});
    }
    ngAfterViewInit() {
        mLayout.initAside();
    }
}
