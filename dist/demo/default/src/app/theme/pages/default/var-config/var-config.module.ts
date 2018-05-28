import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RouterModule, Routes} from '@angular/router'
import {EnvVarConfigComponent} from './var-config.component'
import {DefaultComponent} from '../../../../shared/defalt/default.component'
import {SharedModule} from '../../../../shared/shared.module'

const routes: Routes = [
    {
        path: '',
        component: DefaultComponent,
        children: [
            {
                path: '',
                component: EnvVarConfigComponent,
            },
        ],
    },
]

let components = [EnvVarConfigComponent]

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
    declarations: [...components],
    exports: [RouterModule],
})
export class VarConfigModule {
    constructor() {}
}
