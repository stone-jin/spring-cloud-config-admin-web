import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductCompponent } from './product.component';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from '../../../../shared/defalt/default.component';
import { SharedModule } from '../../../../shared/shared.module';


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
    ],
    declarations: [ProductCompponent],
    exports: [RouterModule],
})
export class ProductModule { }
