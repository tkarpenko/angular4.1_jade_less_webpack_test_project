import { Injectable }    from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }    from 'rxjs/Observable';

import { Channel }       from '../../../core/models/channel.model';
import { Statistic }     from '../../../core/models/statistic.model';

@Injectable()
export class ChannelRequest {

  private api: any = {
    channels: 'api/channels',
    channel: 'api/channels'
  };

  constructor (
    private http: Http
  ) {}

  public getChannels (requestOpt?: any): Observable<Channel[]> {
    return this.http
            .get( `${this.api.channels}` )
            .map((r: Response) => r.json().data.map((channel: Channel) => new Channel(channel)))
            .catch( this.handleError );
  }

  public getChannel (id: number): Observable<Channel> {
    return this.http
            .get( `${this.api.channel}/${id}` )
            .map((r: Response) => new Channel(r.json().data))
            .catch( this.handleError );
  }

  private handleError (error: Response | any) {
    let errMsg: string;

    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    return Observable.throw(errMsg);
  }
}
