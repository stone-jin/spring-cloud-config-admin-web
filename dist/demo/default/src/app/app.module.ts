import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ThemeComponent} from './theme/theme.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ScriptLoaderService} from './_services/script-loader.service';
import {ThemeRoutingModule} from './theme/theme-routing.module';
import {AuthModule} from './auth/auth.module';
import {SharedModule} from './shared/shared.module';

@NgModule({
    declarations: [ThemeComponent, AppComponent],
    imports: [
        SharedModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ThemeRoutingModule,
        AuthModule,
    ],
    providers: [ScriptLoaderService],
    bootstrap: [AppComponent],
})
export class AppModule {}
