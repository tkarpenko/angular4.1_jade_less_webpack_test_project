import { NgModule }       from '@angular/core';
import { RouterModule }   from '@angular/router';

import { ChannelComponent }            from './one/channel.component';
import { ChannelDescriptionComponent } from './description/channel-desc.component';
import { ChannelResolver }             from './resolvers/channel.resolver';

export const channelRouting = [
  {
    path: 'channel/:channelId',
    component: ChannelComponent,
    resolve: {
      channel: ChannelResolver
    },
    children: [
      {
        path: '',
        redirectTo: 'description',
        pathMatch: 'full'
      },
      {
        path: 'description',
        component: ChannelDescriptionComponent
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild( channelRouting ) ],
  exports: [ RouterModule ]
})
export class ChannelRoutingModule {}
