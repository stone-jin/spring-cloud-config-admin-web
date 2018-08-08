import {
    Component,
    OnInit,
    ViewEncapsulation,
    AfterViewInit,
} from '@angular/core';
import { Ajax } from '../ajax/ajax.service';

declare let mLayout: any;
declare let toastr: any;
@Component({
    selector: 'app-header-nav',
    templateUrl: './header-nav.component.html',
    styleUrls: ['./header-nav.component.scss'],
})
export class HeaderNavComponent implements OnInit, AfterViewInit {
    public userInfo: any;
    constructor(private ajax: Ajax) { }
    ngOnInit() { }
    ngAfterViewInit() {
        mLayout.initHeader();
        this.getUserInfo();
    }

    async getUserInfo() {
        try {
            this.userInfo = await this.ajax.get('/xhr/user');
            console.log(this.userInfo);
        } catch (e) {
            toastr.error('获取用户信息失败!');
        }
    }
}
