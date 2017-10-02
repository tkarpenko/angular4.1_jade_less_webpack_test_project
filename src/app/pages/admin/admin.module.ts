import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule }                 from '@angular/common';
import { RouterModule }                 from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule }     from './admin-routing.module';
import { AdminComponent }         from './admin.component';

import { SharedModule }           from '../../shared/shared.module';

import { ChannelModule }             from './channel/channel.module';
import { ActiveChannelsComponent }   from './active-channels/active-channels.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule,
    SharedModule,
    ChannelModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AdminComponent,
    ActiveChannelsComponent
  ],
  providers: [
  ]
})

export class AdminModule {
  constructor (@Optional() @SkipSelf() parentModule: AdminModule) {
    if (parentModule) throw new Error('AdminModule is already loaded');
  }
}
