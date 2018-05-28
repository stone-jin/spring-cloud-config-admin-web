import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {Routes, RouterModule} from '@angular/router'
import {ErrorsError5Component} from './errors-error-5.component'
import {SharedModule} from '../../../../../../../shared/shared.module'

const routes: Routes = [
    {
        path: '',
        component: ErrorsError5Component,
    },
]
@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
    exports: [RouterModule],
    declarations: [ErrorsError5Component],
})
export class ErrorsError5Module {}
