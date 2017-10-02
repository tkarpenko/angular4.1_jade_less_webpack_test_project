import { Injectable }             from '@angular/core';
import { Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot, Router } from '@angular/router';

import { Http, Response  }        from '@angular/http';
import { Channel }                from '../../../../core/models/channel.model';
import { ChannelRequest }         from '../channel.request';

@Injectable()
export class ChannelResolver implements Resolve< Channel > {

  constructor(
    private http: Http,
    private router: Router,
    private channelRequest: ChannelRequest
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<Channel> {

    let id = route.params['channelId'] ? +route.params['channelId'] : null;
    return this.channelRequest.getChannel(id).toPromise()
            .then((channel: Channel) => channel )
            .catch(() => {
              this.router.navigate(['/admin']);
              return null;
            });
  }
}
