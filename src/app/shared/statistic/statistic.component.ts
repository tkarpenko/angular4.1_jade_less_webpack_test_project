import { Component, Input }   from '@angular/core';
import { Statistic }                      from '../../core/models/statistic.model';
import { Point, Data, Size, ChartFilter } from '../../core/types/chart-data.interface';

import * as moment from 'moment';

@Component({
  selector: 'drw-statistic',
  templateUrl: './statistic.component.jade'
})

export class StatisticComponent {

  @Input() category: 'Channel' = 'Channel';
  @Input() categoryName: string;
  @Input() charts: Statistic;
  @Input() archived: number = 0;

  private chartsFilter: ChartFilter[] = [
    {
      name: 'All Statistic',
      charts: ['revenue', 'traffic']
    },
    {
      name: 'Revenue',
      charts: ['revenue'],
      amount: 0
    }
  ];

  constructor() {
  }
}
