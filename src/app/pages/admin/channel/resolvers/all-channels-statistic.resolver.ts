import { Injectable }             from '@angular/core';
import { Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable }             from 'rxjs/Observable';

import { StatisticRequest }       from '../../../../shared/statistic/statistic.request';
import { Statistic }              from '../../../../core/models/statistic.model';

@Injectable()
export class AllChannelsStatResolver implements Resolve<Statistic> {

  constructor(
    private statisticRequest: StatisticRequest
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Statistic> {

    return this.statisticRequest.getFilterAndFilteredChannelStat();
  }
}
