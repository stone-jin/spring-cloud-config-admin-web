import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {Routes, RouterModule} from '@angular/router'
import {UserLogin5Component} from './user-login-5.component'
import {SharedModule} from '../../../../../../../shared/shared.module'

const routes: Routes = [
    {
        path: '',
        component: UserLogin5Component,
    },
]
@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
    exports: [RouterModule],
    declarations: [UserLogin5Component],
})
export class UserLogin5Module {}
