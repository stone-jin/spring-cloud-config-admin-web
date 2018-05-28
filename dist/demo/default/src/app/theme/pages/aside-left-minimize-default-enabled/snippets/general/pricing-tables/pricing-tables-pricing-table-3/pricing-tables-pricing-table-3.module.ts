import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {Routes, RouterModule} from '@angular/router'
import {PricingTablesPricingTable3Component} from './pricing-tables-pricing-table-3.component'
import {AsideLeftMinimizeDefaultEnabledComponent} from '../../../../aside-left-minimize-default-enabled.component'
import {SharedModule} from '../../../../../../../shared/shared.module'

const routes: Routes = [
    {
        path: '',
        component: AsideLeftMinimizeDefaultEnabledComponent,
        children: [
            {
                path: '',
                component: PricingTablesPricingTable3Component,
            },
        ],
    },
]
@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
    exports: [RouterModule],
    declarations: [PricingTablesPricingTable3Component],
})
export class PricingTablesPricingTable3Module {}
