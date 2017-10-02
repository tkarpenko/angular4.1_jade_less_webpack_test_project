import { NgModule, Optional, SkipSelf }       from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartCanvasComponent }           from './chart-canvas/chart-canvas.component';

import { StatisticComponent }             from './statistic/statistic.component';
import { StatisticRequest }               from './statistic/statistic.request';

import { ChartsModule }                   from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule
  ],
  declarations: [
    ChartCanvasComponent,
    StatisticComponent
  ],
  exports: [
    ChartCanvasComponent,
    StatisticComponent
  ],
  providers: [
    StatisticRequest
  ]
})

export class SharedModule {
  constructor (@Optional() @SkipSelf() parentModule: SharedModule) {
    if (parentModule) throw new Error('SharedModule is already loaded');
  }
}
