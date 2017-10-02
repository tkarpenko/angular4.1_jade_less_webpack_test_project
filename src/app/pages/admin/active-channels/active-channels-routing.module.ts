import { NgModule }       from '@angular/core';
import { RouterModule }   from '@angular/router';

import { channelRouting }          from '../channel/channel-routing.module';
import { AllChannelsComponent }    from '../channel/all/all-channels.component';
import { AllChannelsStatResolver } from '../channel/resolvers/all-channels-statistic.resolver';

export const activeChannelsRouting = [
  {
    path: '',
    redirectTo: 'all-items',
    pathMatch: 'full'
  },
  {
    path: 'all-items',
    component: AllChannelsComponent,
    resolve: {
      filterAndStat: AllChannelsStatResolver
    }
  },
  ...channelRouting
];

@NgModule({
  imports: [ RouterModule.forChild( channelRouting ) ],
  exports: [ RouterModule ]
})
export class ChannelRoutingModule {}
