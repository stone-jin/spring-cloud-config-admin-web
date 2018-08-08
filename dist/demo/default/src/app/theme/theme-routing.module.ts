import {NgModule} from '@angular/core';
import {ThemeComponent} from './theme.component';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from '../auth/_guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: ThemeComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'index',
                loadChildren: './pages/default/index/index.module#IndexModule',
            },
            {
                path: 'env/env-config',
                loadChildren:
                    './pages/default/env-config/env-config.module#EnvConfigModule',
            },
            {
                path: 'env/env-params',
                loadChildren:
                    './pages/default/env-params/env-params.module#EnvParamsModule',
            },
            {
                path: 'env/var-config',
                loadChildren:
                    './pages/default/var-config/var-config.module#VarConfigModule',
            },
            {
                path: 'env/encrpy-key',
                loadChildren:
                    './pages/default/encrpy-key/encrpy-key.module#EncrpyKeyModule',
            },
            {
                path: 'product/product',
                loadChildren:
                    './pages/default/product/product.module#ProductModule',
            },
            {
                path: 'config/manage',
                loadChildren:
                    './pages/default/config-manage/config-manage.module#ConfigManageModule',
            },
            {
                path: 'permControl/userManage',
                loadChildren:
                    './pages/default/permControl/userManage.module#UserManageModule',
            },
            {
                path: '404',
                loadChildren:
                    './pages/default/not-found/not-found.module#NotFoundModule',
            },
            {
                path: '',
                redirectTo: 'index',
                pathMatch: 'full',
            },
        ],
    },
    {
        path: '**',
        redirectTo: '404',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ThemeRoutingModule {}
