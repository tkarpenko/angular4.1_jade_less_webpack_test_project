import { NgModule, Optional, SkipSelf }  from '@angular/core';

import { AdminModule } from './admin/admin.module';

@NgModule({
  imports: [
    AdminModule
  ],
  exports: [
    AdminModule
  ]
})

export class PagesModule {
  constructor (@Optional() @SkipSelf() parentModule: PagesModule) {
    if (parentModule) throw new Error('PagesModule is already loaded');
  }
}
