import { Component, OnInit, Input } from '@angular/core';

import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-graficodona',
  templateUrl: './graficodona.component.html',
  styles: []
})
export class GraficodonaComponent implements OnInit {
  // Doughnut
  @Input() tittle: string = null;
  @Input() doughnutChartLabels: Label[] = null;
  @Input() doughnutChartData: MultiDataSet = null;
  @Input() doughnutChartType: ChartType = null;

  constructor() { }

  ngOnInit(): void {
    if (this.tittle == null) {
      this.tittle = 'Gráfico por defecto';
    }

    if (this.doughnutChartLabels == null) {
      this.doughnutChartLabels = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
    }

    if (this.doughnutChartData == null) {
      this.doughnutChartData = [
        [350, 450, 100],
        [50, 150, 120],
        [250, 130, 70],
      ];
    }

    if (this.doughnutChartType == null) {
      this.doughnutChartType = 'doughnut';
    }
  }
}
