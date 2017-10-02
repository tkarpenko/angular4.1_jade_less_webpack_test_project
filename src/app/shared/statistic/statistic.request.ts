import { Injectable }    from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }    from 'rxjs/Observable';

import { Statistic }     from '../../core/models/statistic.model';

@Injectable()
export class StatisticRequest {

  private api: any = {
    channelStat: 'api/channelStat'
  };

  constructor (
    private http: Http
  ) {}

  public getFilterAndFilteredChannelStat(): Observable<Statistic> {
    return this.http
            .get( `${this.api.channelStat}` )
            .map((r: Response) => new Statistic(r.json().data))
            .catch( this.handleResolver );
  }

  private handleResolver(error: Response | any) {
    return Observable.empty();
  }
}
