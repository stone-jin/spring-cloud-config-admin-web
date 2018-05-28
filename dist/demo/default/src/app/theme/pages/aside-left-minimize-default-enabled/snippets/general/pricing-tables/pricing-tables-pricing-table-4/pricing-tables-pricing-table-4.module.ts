import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {Routes, RouterModule} from '@angular/router'
import {PricingTablesPricingTable4Component} from './pricing-tables-pricing-table-4.component'
import {AsideLeftMinimizeDefaultEnabledComponent} from '../../../../aside-left-minimize-default-enabled.component'
import {SharedModule} from '../../../../../../../shared/shared.module'

const routes: Routes = [
    {
        path: '',
        component: AsideLeftMinimizeDefaultEnabledComponent,
        children: [
            {
                path: '',
                component: PricingTablesPricingTable4Component,
            },
        ],
    },
]
@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
    exports: [RouterModule],
    declarations: [PricingTablesPricingTable4Component],
})
export class PricingTablesPricingTable4Module {}
