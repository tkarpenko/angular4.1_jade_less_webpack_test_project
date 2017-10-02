import { Component, OnInit, OnDestroy }  from '@angular/core';
import { ActivatedRoute }                from '@angular/router';

import { Statistic }                     from '../../../../core/models/statistic.model';

@Component({
  templateUrl: './all-channels.component.jade'
})

export class AllChannelsComponent implements OnInit, OnDestroy {
  private charts: Statistic;
  private routeSubscr: any;

  constructor(
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.routeSubscr = this.route.data.subscribe((data: any) => this.charts = data.filterAndStat );
  }
  ngOnDestroy() {
    this.routeSubscr.unsubscribe();
  }
}
