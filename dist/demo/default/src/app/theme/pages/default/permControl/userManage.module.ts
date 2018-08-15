import { SharedModule } from './../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from '../../../../shared/defalt/default.component';
import { UserManageComponent } from './userManage.component';

const routes: Routes = [
    {
        path: '',
        component: DefaultComponent,
        children: [
            {
                path: '',
                component: UserManageComponent,
            },
        ],
    },
];

@NgModule({
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [UserManageComponent],
})
export class UserManageModule { }
