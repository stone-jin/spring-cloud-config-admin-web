import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { IndexComponent } from './index.component'
import { SharedModule } from '../../../../shared/shared.module'
import { DefaultComponent } from '../../../../shared/defalt/default.component'

const routes: Routes = [
    {
        path: '',
        component: DefaultComponent,
        children: [
            {
                path: '',
                component: IndexComponent,
            },
        ],
    },
]
@NgModule({
    imports: [SharedModule, CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [IndexComponent],
})
export class IndexModule { }
