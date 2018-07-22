import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { PricingTablesPricingTable2Component } from './pricing-tables-pricing-table-2.component'
import { AsideLeftMinimizeDefaultEnabledComponent } from '../../../../aside-left-minimize-default-enabled.component'
import { SharedModule } from '../../../../../../../shared/shared.module'

const routes: Routes = [
    {
        path: '',
        component: AsideLeftMinimizeDefaultEnabledComponent,
        children: [
            {
                path: '',
                component: PricingTablesPricingTable2Component,
            },
        ],
    },
]
@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
    exports: [RouterModule],
    declarations: [PricingTablesPricingTable2Component],
})
export class PricingTablesPricingTable2Module { }
