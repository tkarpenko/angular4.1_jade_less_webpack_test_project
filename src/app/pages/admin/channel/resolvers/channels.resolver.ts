import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Channel }                from '../../../../core/models/channel.model';
import { ChannelRequest }         from '../channel.request';

@Injectable()
export class ChannelsResolver implements Resolve<Channel[]> {

  constructor(
    private router: Router,
    private channelRequest: ChannelRequest
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<Channel[]> {
    return this.channelRequest.getChannels().toPromise();
  }
}
