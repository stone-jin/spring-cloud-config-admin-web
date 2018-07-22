import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from '../../../../shared/defalt/default.component';
import { SharedModule } from '../../../../shared/shared.module';
import { ConfigManageComponent } from './config-manage.component';

const routes: Routes = [
    {
        path: '',
        component: DefaultComponent,
        children: [
            {
                path: '',
                component: ConfigManageComponent,
            },
        ],
    },
];

const components: any[] = [];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
    declarations: [ConfigManageComponent],
    exports: [RouterModule],
})
export class ConfigManageModule { }
