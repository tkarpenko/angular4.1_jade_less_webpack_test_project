import { Point, Data, Size } from '../types/chart-data.interface';
import * as moment from 'moment';

export class Statistic {
  revenue: Data;
  traffic: Data;

  constructor(stat?: any[]) {
    if (!stat) stat = [];

    this.revenue = {
      name: 'Revenue',
      label: 'Date',
      points: []
    };

    this.traffic = {
      name: 'Traffic',
      label: 'Date',
      points: []
    };

    let prevDate: any = null;
    let sameDateAsBefore: boolean = false;

    let revenuePoint: Point;
    let trafficPoint: Point;

    let tmpY: number;

    stat.forEach((item: any, index: number) => {

      sameDateAsBefore = !prevDate ? false : moment(item.date).diff(prevDate) < 1;
      prevDate = moment(item.date);

      if (typeof +item.revenue === 'number' && !isNaN(+item.revenue)) {
        if (!sameDateAsBefore && revenuePoint) {
          this.revenue.points.push(revenuePoint);
          tmpY = +item.revenue;
        } else {
          tmpY = revenuePoint ? revenuePoint.y + (+item.revenue) : +item.revenue;
        }

        revenuePoint = {
          x: moment(item.date),
          y: tmpY
        };

        if ( index + 1 === stat.length) {
          this.revenue.points.push(revenuePoint);
        }
      }

      if (typeof +item.requests === 'number' && !isNaN(+item.requests)) {
        if (!sameDateAsBefore && trafficPoint) {
          this.traffic.points.push(trafficPoint);
          tmpY = +item.requests;
        } else {
          tmpY = trafficPoint ? trafficPoint.y + (+item.requests) : +item.requests;
        }

        trafficPoint = {
          x: moment(item.date),
          y: tmpY
        };

        if ( index + 1 === stat.length) {
          this.traffic.points.push(trafficPoint);
        }
      }
    });
  }

  public getTotalValue(chartName: string): number {
    if (!this[chartName] || !this[chartName].points) return 0;

    let total: number = 0;
    this[chartName].points.forEach((point: Point) => {
      total += point.y;
    });
    return total;
  }
}
