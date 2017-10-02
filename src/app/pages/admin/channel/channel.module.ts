import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule }                 from '@angular/common';
import { RouterModule }                 from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule }                 from '../../../shared/shared.module';

import { ChannelRequest }              from './channel.request';
import { AllChannelsComponent }        from './all/all-channels.component';
import { ChannelComponent }            from './one/channel.component';
import { ChannelDescriptionComponent } from './description/channel-desc.component';

import { ChannelRoutingModule }        from './channel-routing.module';
import { ChannelResolver }             from './resolvers/channel.resolver';
import { AllChannelsStatResolver }     from './resolvers/all-channels-statistic.resolver';
import { ChannelsResolver }            from './resolvers/channels.resolver';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ChannelRoutingModule,
    SharedModule
  ],
  declarations: [
    AllChannelsComponent,
    ChannelComponent,
    ChannelDescriptionComponent
  ],
  providers: [
    ChannelRequest,
    ChannelResolver,
    ChannelsResolver,
    AllChannelsStatResolver
  ]
})

export class ChannelModule {
  constructor (@Optional() @SkipSelf() parentModule: ChannelModule) {
    if (parentModule) throw new Error('ChannelModule is already loaded');
  }
}
