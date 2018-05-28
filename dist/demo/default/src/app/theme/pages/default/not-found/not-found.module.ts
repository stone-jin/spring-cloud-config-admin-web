import { SharedModule } from './../../../../shared/shared.module';
import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {Routes, RouterModule} from '@angular/router'
import {NotFoundComponent} from './not-found.component'
import {DefaultComponent} from '../../../../shared/defalt/default.component'

const routes: Routes = [
    {
        path: '',
        component: DefaultComponent,
        children: [
            {
                path: '',
                component: NotFoundComponent,
            },
        ],
    },
]

@NgModule({
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [NotFoundComponent],
})
export class NotFoundModule {}
