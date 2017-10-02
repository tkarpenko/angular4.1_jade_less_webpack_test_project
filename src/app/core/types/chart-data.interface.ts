export interface Point {
  x: any; // ms
  y: number;
}

export interface Data {
  name: string;
  label: string;
  points: Point[];
}

export interface Size {
  width: number;
  height: number;
}

export interface ChartFilter {
  name: string;
  charts: string[];
  amount?: number;
}
