import { Component, OnInit, ViewChild,
         ElementRef, HostListener,
         OnChanges, Input }               from '@angular/core';

import { Statistic }                      from '../../core/models/statistic.model';
import { Point, Data, Size, ChartFilter } from '../../core/types/chart-data.interface';

import * as moment from 'moment';
import * as Chart from 'chart.js';

export const xAxesTimeFormat = {
  hours: {
    format: 'HH:mm',
    unit: 'hour',
    unitStepSize: 1,
    displayFormats: {
      'minute': 'HH:mm',
      'hour': 'HH:mm'
    },
    tooltipFormat: 'D MMMM YYYY, HH:mm'
  },
  days: {
    format: 'HH:mm',
    unitStepSize: 1,
    unit: 'day',
    displayFormats: {
      'day': 'D MMMM'
    },
    tooltipFormat: 'D MMMM YYYY, HH:mm'
  },
  months: {
    format: 'MMM YYYY',
    unit: 'month',
    displayFormats: {
      'month': 'MMM YYYY'
    },
    tooltipFormat: 'D MMMM YYYY, HH:mm'
  }
};

export const chartColors = [
  'rgba(255, 159, 64, 1.0)',  // orange
  'rgba(153, 102, 255, 0.9)', // purple
  'rgba(255, 99, 132, 0.9)',  // red
  'rgba(54, 162, 235, 0.5)',  // blue
  'rgba(75, 192, 192, 1.0)',   // green
  'rgba(201, 203, 207, 0.6)', // grey
  'rgb(255, 205, 86)'  // yellow
];

export const CANVAS_BARS_MARGIN = 4;
export const CANVAS_MAX_0X_POINTS_AMOUNT = 100;
export const CANVAS_BARS_MAX_WIDTH = 60;

@Component({
  selector: 'drw-chart-canvas',
  templateUrl: './chart-canvas.component.jade'
})

export class ChartCanvasComponent implements OnInit, OnChanges {

  private canvasWidth: number;
  private unitedPointsAmount: number;
  private resizeHandleTimeout: number;

  @Input() charts: Statistic;
  @Input() startDate: any = moment().subtract(6, 'days').startOf('day');
  @Input() endDate: any = moment().endOf('day');

  public canvasChart: Chart;

  public lineDatasetBlank: any = {
    fill:        false,
    lineTension: 0,
    yAxisID:     `y-axis-1`,
    type:       'line'
  };

  public barDatasetBlank: any = {
    borderWidth: 1,
    yAxisID:     `y-axis-2`,
    type:        'bar'
  };

  @ViewChild('chart') chartsInView: ElementRef;

  @HostListener('window:resize', ['$event.target'])
  clickHandle( event ) {
    this.canvasWidth = this.chartsInView.nativeElement.offsetWidth;
    this.chartsInView.nativeElement.offsetHeigth = this.chartsInView.nativeElement.offsetWidth * 12 / 25;
    if (!this.canvasChart) return;
    clearTimeout(this.resizeHandleTimeout);
    let timer = setTimeout(this.drowCharts.bind(this), 10);
    this.resizeHandleTimeout = timer['data'].handleId;
  }

  constructor() {
  }

  ngOnInit() {
    this.createPlot();
    this.drowCharts();
  }

  ngOnChanges(changes) {
    if ( (typeof changes['charts'] !== 'undefined' &&
         typeof changes['charts'].currentValue !== 'undefined')) {
      if (!this.canvasChart) return;
      this.drowCharts();
    }
  }

  private createPlot(): void {
    let options: any = {
      type: 'bar',
      data: {
        datasets: []
      },
      options: {
        responsive: true,
        legend: {
          display: false
        },
        title: {
          display: false
        },
        scales: {
          xAxes: [{
            display: false,
            type: 'time',
            time: this.getChartTimeFormat({start: this.startDate, end: this.endDate}),
            gridLines: {
              display: false
            },
            barThickness: 20
          }],
          yAxes: [{
            type: 'linear',
            display: true,
            position: 'left',
            id: 'y-axis-1',
            scaleLabel: {
              display: true,
              labelString: ''
            }
          }, {
            type: 'linear',
            display: true,
            position: 'right',
            id: 'y-axis-2',
            scaleLabel: {
              display: true,
              labelString: 'Traffic'
            }
          }]
        }
      }
    };

    this.canvasChart = new Chart(this.chartsInView.nativeElement.getContext('2d'), options);
  }

  private drowCharts(): void {
    this.canvasWidth = this.chartsInView.nativeElement.offsetWidth;
    this.updateTimeRange(this.charts);

    this.canvasChart.options.scales.xAxes[0].time = this.getChartTimeFormat({start: this.startDate, end: this.endDate});
    this.canvasChart.data.datasets = [];
    this.canvasChart.data.labels = undefined;
    this.canvasChart.options.scales.xAxes[0].display = false;
    this.canvasChart.options.scales.yAxes[1].display = false;
    this.canvasChart.options.scales.yAxes[0].scaleLabel.labelString = this.getLeftAxesLabel();

    let dataset: any;
    let isAnyCharts: boolean = false;
    let barChartsAmount: number = 0;

    Object.keys(this.charts).forEach((chartName: string, index: number) => {

      let chart: Data = {...this.charts[chartName]};
      chart.points = this.unitePoints(chart.points);

      dataset = (chartName === 'traffic') ? {...this.barDatasetBlank} : {...this.lineDatasetBlank};
      dataset.data = chart.points;

      dataset.label = chart.name;
      if (dataset.data.length) isAnyCharts = true;

      if (chartName === 'traffic') {
        let barPoints = this.getBarChartPoints(chart);
        dataset.data = barPoints.y;
        this.canvasChart.options.scales.yAxes[1].display = true;
        this.canvasChart.data.labels = barPoints.x;
        barChartsAmount = barPoints.x.length;
        if (barChartsAmount) isAnyCharts = true;
      }

      dataset.borderColor = chartColors[index];
      dataset.backgroundColor = chartColors[index];
      this.canvasChart.data.datasets.push(dataset);
    });

    if (isAnyCharts) this.canvasChart.options.scales.xAxes[0].display = true;
    if (barChartsAmount) {
      this.canvasChart.options.scales.xAxes[0].barThickness = this.getCanvasBarsWindth();
    }
    this.canvasChart.update();
  }

  private getCanvasBarsWindth(): number {
    let computedValue: number = Math.floor(this.canvasWidth / this.getCanvasXPointsAmount() - CANVAS_BARS_MARGIN);
    return computedValue > CANVAS_BARS_MAX_WIDTH ? CANVAS_BARS_MAX_WIDTH : computedValue;
  }
  private unitePoints(points: Point[]): Point[] {
    let posibleMaxHoursAmount: number = Math.floor(moment.duration(this.endDate.diff(this.startDate)).asHours());
    let newPoints: Point[] = points;
    let newPoint: Point;
    this.unitedPointsAmount = Math.ceil(posibleMaxHoursAmount / CANVAS_MAX_0X_POINTS_AMOUNT);

    if (this.unitedPointsAmount > 1) {
      newPoints = [];
      points.forEach((p: Point, index: number) => {
        if (index % this.unitedPointsAmount === this.unitedPointsAmount - 1) {
          newPoints.push(newPoint);
          newPoint = null;
          return;
        }
        if (newPoint) {
          newPoint = {x: p.x, y: newPoint.y + p.y };
          return;
        }
        newPoint = p;
      });
    }
    return newPoints;
  }

  private getLeftAxesLabel(): string {
    let label: string = '';
    Object.keys(this.charts).forEach((chartName: string) => {
      if (chartName === 'traffic') return;
      label += label === '' ? `${this.charts[chartName].name}` : `, ${this.charts[chartName].name}`;
    });
    return label;
  }

  private getBarChartPoints(chart: Data): {[key: string]: number[]} {
    let points: any = {
      x: [],
      y: []
    };
    chart.points.forEach((point: Point) => {
      points.x.push(point.x);
      points.y.push(point.y);
    });
    return points;
  }

  private updateTimeRange(charts: Statistic): void {
    let minDate: any;
    let maxDate: any;

    Object.keys(this.charts).forEach((chartName: string) => {

      this.charts[chartName].points.forEach((point: Point) => {
        minDate = !minDate ? point.x : ( minDate.diff(point.x) > 0 ? point.x : minDate);
        maxDate = !maxDate ? point.x : ( maxDate.diff(point.x) < 0 ? point.x : maxDate);
      });

    });
    if (minDate && maxDate) {
      this.startDate = minDate;
      this.endDate = maxDate;
    }
  }

  private getChartTimeFormat(date: any): any {
    let duration = moment.duration(moment(date.end).diff(moment(date.start)));
    if ( Math.floor(duration.asMonths()) > 0 ) return xAxesTimeFormat.months;
    if ( Math.floor(duration.asDays()) > 1 ) return xAxesTimeFormat.days;
    return xAxesTimeFormat.hours;
  }

  private getCanvasXPointsAmount(): any {
    let duration = moment.duration(this.endDate.diff(this.startDate));
    return Math.ceil(duration.asHours() / this.unitedPointsAmount ) + 1;
  }
}
