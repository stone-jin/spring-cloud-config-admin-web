import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {QuickSidebarComponent} from './quick-sidebar/quick-sidebar.component';
import {AsideNavComponent} from './aside-nav/aside-nav.component';
import {ScrollTopComponent} from './scroll-top/scroll-top.component';
import {AsideLeftMinimizeDefaultEnabledComponent} from '../theme/pages/aside-left-minimize-default-enabled/aside-left-minimize-default-enabled.component';
import {RouterModule} from '@angular/router';
import {FooterComponent} from './footer/footer.component';
import {TooltipsComponent} from './tooltips/tooltips.component';
import {LayoutComponent} from './layout/layout.component';
import {HeaderNavComponent} from './header-nav/header-nav.component';
import {DefaultComponent} from './defalt/default.component';
import {HrefPreventDefaultDirective} from '../_directives/href-prevent-default.directive';
import {UnwrapTagDirective} from '../_directives/unwrap-tag.directive';
import {HttpClientModule} from '@angular/common/http';
import {Ajax} from './ajax/ajax.service';
import {MonacoEditorModule} from 'ngx-monaco-editor';
import {AjaxToastrService} from './AjaxToastr/ajaxToastr.service';

let components = [
    QuickSidebarComponent,
    AsideNavComponent,
    ScrollTopComponent,
    AsideLeftMinimizeDefaultEnabledComponent,
    DefaultComponent,
    FooterComponent,
    TooltipsComponent,
    LayoutComponent,
    HeaderNavComponent,
    HrefPreventDefaultDirective,
    UnwrapTagDirective,
];

let services = [Ajax, AjaxToastrService];

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        HttpClientModule,
        MonacoEditorModule,
    ],
    declarations: [...components],
    providers: [...services],
    exports: [
        ...components,
        CommonModule,
        RouterModule,
        FormsModule,
        MonacoEditorModule,
    ],
})
export class SharedModule {}
