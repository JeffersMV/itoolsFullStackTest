import {Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {
    AccordionModule,
    ButtonModule,
    DataTableModule,
    DialogModule,
    InputTextModule,
    SharedModule
} from "primeng/primeng";
import {GrowlModule} from 'primeng/growl';
import {TableModule} from 'primeng/table';
import {MatTooltipModule} from '@angular/material/tooltip';

import {AppRoutingModule} from './app-routing.module';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ConfigHttpLoader} from '@ngx-config/http-loader';
import {ConfigLoader, ConfigModule} from '@ngx-config/core';

import {AppComponent} from './app.component';
import {MenuComponent} from './components/menu/menu.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {LocatorService} from "./services/configuration/locator.service";
import {SettingsService} from "./services/configuration/settings.service";
import {GlobalCommunicationService} from "./services/configuration/global-communication.service";
import {AuthorComponent} from './components/author/author.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {AddAuthorComponent} from './components/author/add-author/add-author.component';
import {BookComponent} from './components/book/book.component';
import {AddBookComponent} from './components/book/add-book/add-book.component';
import {DetailsBookComponent} from './components/book/details-book/details-book.component';
import {DetailsAuthorComponent} from './components/author/details-author/details-author.component';
import {HomeComponent} from './components/home/home.component';
import {AuthorService} from "./services/author.service";
import {BookService} from "./services/book.service";


export function configFactory(http: HttpClient) {
    return new ConfigHttpLoader(http, './assets/config.json');
}

@NgModule({
    declarations: [
        AppComponent,
        MenuComponent,
        SidebarComponent,
        AuthorComponent,
        AddAuthorComponent,
        DetailsAuthorComponent,
        BookComponent,
        AddBookComponent,
        DetailsBookComponent,
        HomeComponent
    ],
    imports: [
        ConfigModule.forRoot({
            provide: ConfigLoader,
            useFactory: (configFactory),
            deps: [HttpClient]
        }),
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        GrowlModule,
        InputTextModule,
        AccordionModule,
        SharedModule,
        DataTableModule,
        ButtonModule,
        DialogModule,
        AppRoutingModule,
        HttpClientModule,
        GrowlModule,
        TableModule,
        MatTooltipModule
    ],
    providers: [
        AuthorService,
        BookService,
        SettingsService,
        GlobalCommunicationService
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
    constructor(private injection: Injector) {
        LocatorService.injector = this.injection;
    }
}
