import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProductCompponent} from './product.component';
import {CommonModule} from '@angular/common';
import {DefaultComponent} from '../../../../shared/defalt/default.component';
import {SharedModule} from '../../../../shared/shared.module';

import {ChipsModule} from 'primeng/primeng';

const routes: Routes = [
    {
        path: '',
        component: DefaultComponent,
        children: [
            {
                path: '',
                component: ProductCompponent,
            },
        ],
    },
];

const components: any[] = [];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        ChipsModule,
    ],
    declarations: [ProductCompponent],
    exports: [RouterModule],
})
export class ProductModule {}
