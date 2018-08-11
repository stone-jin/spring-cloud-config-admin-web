import {
    Component,
    OnInit,
    ViewEncapsulation,
    AfterViewInit,
} from '@angular/core';
import {Ajax} from '../ajax/ajax.service';

declare let mLayout: any;
declare let toastr: any;
declare let $: any;
@Component({
    selector: 'app-header-nav',
    templateUrl: './header-nav.component.html',
    styleUrls: ['./header-nav.component.scss'],
})
export class HeaderNavComponent implements OnInit, AfterViewInit {
    public userInfo: any;
    public formData: any = {
        nickname: ''
    };
    constructor(private ajax: Ajax) {}
    ngOnInit() {}
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

    async saveModal() {
        try{
            let result = await this.ajax.put("/xhr/user/nickname", {
                nickname: this.formData.nickname
            })
            toastr.success('更新用户信息失败!');
        }catch(e){
            toastr.error('更新用户信息失败!');
        }
    }

    closeModal() {
        $("#edit_user_form").modal('hide')
    }

    editUserInfo(){
        this.formData = {
            nickname: this.userInfo.nickname
        }
        $("#edit_user_form").modal('show')
    }
}
