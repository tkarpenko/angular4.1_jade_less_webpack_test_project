import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpModule, JsonpModule,
         BaseRequestOptions, RequestOptions,
         Headers, RequestOptionsArgs } from '@angular/http';

import { AppRoutingModule }  from './app-routing.module';
import { AppComponent }      from './app.component';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './db-imitation.service';

/* Feature Modules */
import { PagesModule }       from './pages/pages.module';
import { SharedModule }      from './shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpModule,
    JsonpModule,

    InMemoryWebApiModule.forRoot(InMemoryDataService),

    PagesModule,
    SharedModule,

    AppRoutingModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
