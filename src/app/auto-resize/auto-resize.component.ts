import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auto-resize',
  templateUrl: './auto-resize.component.html',
  styleUrls: ['./auto-resize.component.scss']
})
export class AutoResizeComponent implements OnInit {

  autoResize = true;

  options = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line'
    }]
  };

  constructor() { }

  ngOnInit() {
  }

}
