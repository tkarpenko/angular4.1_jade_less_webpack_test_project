import { NgModule }                 from '@angular/core';
import { RouterModule }             from '@angular/router';

import { AdminComponent }           from './admin.component';
import { ChannelsResolver }         from './channel/resolvers/channels.resolver';

import { activeChannelsRouting }    from './active-channels/active-channels-routing.module';
import { ActiveChannelsComponent }  from './active-channels/active-channels.component';

export const route = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'active',
        pathMatch: 'full'
      },
      {
        path: 'active',
        component: ActiveChannelsComponent,
        resolve: {
          channels: ChannelsResolver
        },
        children: [
          ...activeChannelsRouting
        ]
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild( route ) ],
  exports: [ RouterModule ]
})
export class AdminRoutingModule {}
