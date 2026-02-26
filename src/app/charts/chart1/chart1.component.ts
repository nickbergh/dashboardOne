import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-chart1',
  templateUrl: './chart1.component.html',
  styleUrls: ['./chart1.component.scss']
})
export class Chart1Component implements OnInit {
  public data = [125, 100, 50, 75, 300];

  public svgDimensions: {
    dimensions: DOMRect;
    width: number;
    maxHeight: number;
  } = {
    dimensions: new DOMRect(),
    width: 50,
    maxHeight: 250
  }

  public columnPadding: {
    // Calculated
    padding: number;
    bandwidth: number;
    // Set
    outerPadding: number;
    bandwidthCoef: number;
  } = {
    padding: 0,
    bandwidth: 0,
    outerPadding: 20,
    bandwidthCoef: 0.8
  }

  public chartMargin = {
    left: 10,
    right: 20,
    top: 15,
    bottom: 30
  }

  public innerWidth = 0;
  public innerHeight = 0;

  constructor(
    private element: ElementRef
  ) {}

  ngOnInit() {
    // Calculate width of each data svg
    const svg = this.element.nativeElement.getElementsByTagName('svg')[0];
    const dimensions = svg.getBoundingClientRect();

    this.innerWidth = dimensions.width - this.chartMargin.left - this.chartMargin.right;
    this.innerHeight = dimensions.height - this.chartMargin.top - this.chartMargin.bottom;

    this.svgDimensions = {
      dimensions,
      width: (this.innerWidth- 2 * this.columnPadding.outerPadding) / this.data.length,
      maxHeight: 1.1 * Math.max(...this.data)
    }

    this.columnPadding.bandwidth = this.columnPadding.bandwidthCoef * this.svgDimensions.width;
    this.columnPadding.padding = (1 - this.columnPadding.bandwidthCoef) * this.svgDimensions.width;
  }
}
