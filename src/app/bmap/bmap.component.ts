import { Component, OnInit, ElementRef } from '@angular/core';
// import * as echarts from 'echarts';
import { MapOptions, MarkerClustererOptions, Marker, BMarkerClusterer } from 'angular2-baidu-map';



declare var BMap: any;
declare var echarts: any;
declare var BMAP_ANCHOR_TOP_LEFT: any;
declare var BMAP_NAVIGATION_CONTROL_LARGE: any;
declare var BMapLib: any;

declare var BMAPLIB_TAB_SEARCH;   // 周边检索
declare var BMAPLIB_TAB_TO_HERE;  // 到这里去
declare var BMAPLIB_TAB_FROM_HERE; // 从这里出发
declare var BMAP_ANCHOR_TOP_RIGHT;

declare var BMAP_DRAWING_CIRCLE;
declare var BMAP_DRAWING_MARKER;
declare var BMAP_DRAWING_POLYLINE;
declare var BMAP_DRAWING_POLYGON;
declare var BMAP_DRAWING_RECTANGLE;

@Component({
  selector: 'app-bmap',
  templateUrl: './bmap.component.html',
  styleUrls: ['./bmap.component.scss']
})
export class BmapComponent implements OnInit {
  constructor(private el: ElementRef) { }
  // 模拟标记数据-效果图一
  markerArr = [
    {
      long: 116.404,
      lat: 39.915,
      address: '北京'
    },
    {
      long: 113.5107,
      lat: 23.2196,
      address: '地点1'
    },
    {
      long: 80.158246,
      lat: 22.870061,
      address: '地点2'
    },
    {
      long: 68.121138,
      lat: 29.763922,
      address: '地点3'
    }];
  // 模拟标记数据-效果图二
  yuanData = [
    {
      long: 116.404,
      lat: 39.915,
      address: '天安门'
    }, {
      long: 40.086312,
      lat: 22.3877,
      address: '首都机场'
    }, {
      long: 116.400712,
      lat: 39.790456,
      address: '南苑机场'
    },
  ];
  // 模拟标记数据-效果图三
  buildData = [
    {
      long: 116.404177,
      lat: 39.909652,
      address: '天安门广场'
    },
    {
      long: 116.407851,
      lat: 39.91408,
      address: '天安门东'
    },
    {
      long: 116.39805,
      lat: 39.913776,
      address: '天安门西'
    }
  ];
  // 模拟迁徙效果数据-效果图一
  echartsDatas = [
    {
      fromName: '北京',
      toName: '地点1',
      coords: [[116.404, 39.915], [113.5107, 23.2196]]
    },
    {
      fromName: '北京',
      toName: '地点2',
      coords: [[116.404, 39.915], [80.158246, 22.870061]]
    },
    {
      fromName: '北京',
      toName: '地点3',
      coords: [[116.404, 39.915], [68.121138, 29.763922]]
    }
  ];
  // 模拟迁徙效果数据-效果图二
  echartsDatas1 = [
    {
      fromName: '天安门',
      toName: '首都机场',
      coords: [[116.404, 39.915], [116.611579, 40.086312]]
    },
    {
      fromName: '天安门',
      toName: '南苑机场',
      coords: [[116.404, 39.915], [116.400712, 39.790456]]
    }
  ];
  // buildMarkers主要用于标记点的移除
  buildMarkers = [];
  overlays = [];
  myChart;
  bmap: any;
  drawingManager: any;

  searchInfoWindow: any;
  opt = {
    bmap: {
      center: [120.13066322374, 30.240018034923],
      zoom: 15,
      roam: true,
      mapStyle: {
        styleJson: [
          {
            featureType: 'land',     // 调整土地颜色
            elementType: 'geometry',
            stylers: {
              color: '#081734'
            }
          },
          {
            featureType: 'building',   // 调整建筑物颜色
            elementType: 'geometry',
            stylers: {
              color: '#04406F'
            }
          },
          {
            featureType: 'building',   // 调整建筑物标签是否可视
            elementType: 'labels',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'highway',     // 调整高速道路颜色
            elementType: 'geometry',
            stylers: {
              color: '#015B99'
            }
          },
          {
            featureType: 'highway',    // 调整高速名字是否可视
            elementType: 'labels',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'arterial',   // 调整一些干道颜色
            elementType: 'geometry',
            stylers: {
              color: '#003051'
            }
          },
          {
            featureType: 'arterial',
            elementType: 'labels',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'green',
            elementType: 'geometry',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: {
              color: '#044161'
            }
          },
          {
            featureType: 'subway',    // 调整地铁颜色
            elementType: 'geometry.stroke',
            stylers: {
              color: '#003051'
            }
          },
          {
            featureType: 'subway',
            elementType: 'labels',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'railway',
            elementType: 'geometry',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'railway',
            elementType: 'labels',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'all',     // 调整所有的标签的边缘颜色
            elementType: 'labels.text.stroke',
            stylers: {
              color: '#313131'
            }
          },
          {
            featureType: 'all',     // 调整所有标签的填充颜色
            elementType: 'labels.text.fill',
            stylers: {
              color: '#FFFFFF'
            }
          },
          {
            featureType: 'manmade',
            elementType: 'geometry',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'manmade',
            elementType: 'labels',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'local',
            elementType: 'geometry',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'local',
            elementType: 'labels',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'subway',
            elementType: 'geometry',
            stylers: {
              lightness: -65
            }
          },
          {
            featureType: 'railway',
            elementType: 'all',
            stylers: {
              lightness: -40
            }
          },
          {
            featureType: 'boundary',
            elementType: 'geometry',
            stylers: {
              color: '#8b8787',
              weight: '1',
              lightness: -29
            }
          }]
      }
    },
    series: [{
      type: 'scatter',
      coordinateSystem: 'bmap',
      data: [[120, 30, 1]]
    }]
  };

  styleOptions = {
    strokeColor: 'red',    // 边线颜色。
    fillColor: 'red',      // 填充颜色。当参数为空时，圆形将没有填充效果。
    strokeWeight: 3,       // 边线的宽度，以像素为单位。
    strokeOpacity: 0.8,    // 边线透明度，取值范围0 - 1。
    fillOpacity: 0.6,      // 填充的透明度，取值范围0 - 1。
    strokeStyle: 'solid' // 边线的样式，solid或dashed。
  };

  // 信息窗口的内容定义
  content = '<div style="margin:0;line-height:20px;padding:2px;">' +
    '地址：北京市海淀区上地十街10号<br/>电话：(010)59928888<br/>简介：百度大厦位于北京市海淀区西二旗地铁站附近，为百度公司综合研发及办公总部。' +
    '</div>';
  ngOnInit() {
    this.myChart = echarts.init(document.getElementById('map')); // 先初始化 Echarts
    // this.myChart.setOption(this.opt);
    this.myChart.setOption(this.setOptions([78.473184, 24.041486], 4, this.setSeries(this.echartsDatas)));
    this.bmap = this.myChart.getModel().getComponent('bmap').getBMap(); // 调用Echarts的方法来初始化bmap
    // bmap.setMaxZoom(5);
    this.bmap.setMinZoom(1);
    // bmap.addControl(new BMap.MapTypeControl());
    this.setMap(this.bmap);
    // const map = new BMap.Map('map'); // 创建地图实例
    // const point = new BMap.Point(116.404, 39.915); // 创建点坐标
    // map.centerAndZoom(point, 19); // 初始化地图，设置中心点坐标和地图级别
    // map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放

    // 创建带信息窗口的poi点
    // tslint:disable-next-line: prefer-const
    this.searchInfoWindow = new BMapLib.SearchInfoWindow(this.bmap, this.content, {
      title: '百度大厦',      // 标题
      width: 290,             // 宽度
      height: 105,              // 高度
      panel: 'panel',         // 检索结果面板
      enableAutoPan: true,     // 自动平移
      searchTypes: [
        BMAPLIB_TAB_SEARCH,   // 周边检索
        BMAPLIB_TAB_TO_HERE,  // 到这里去
        BMAPLIB_TAB_FROM_HERE // 从这里出发
      ]
    });

    // 实例化鼠标绘制工具
    this.drawingManager = new BMapLib.DrawingManager(this.bmap, {
      isOpen: false, // 是否开启绘制模式
      enableDrawingTool: true, // 是否显示工具栏
      drawingToolOptions: {
        anchor: BMAP_ANCHOR_TOP_RIGHT, // 位置
        offset: new BMap.Size(5, 5), // 偏离值
        scale: 0.8 // 工具栏缩放比例
      },
      circleOptions: this.styleOptions, // 圆的样式
      polylineOptions: this.styleOptions, // 线的样式
      polygonOptions: this.styleOptions, // 多边形的样式
      rectangleOptions: this.styleOptions // 矩形的样式
    });
    console.log(this.overlays);
    // 添加鼠标绘制工具监听事件，用于获取绘制结果
    this.drawingManager.addEventListener('overlaycomplete', (e: any) => {
      this.overlaycomplete(e, this.overlays);
    });



    (this.getElment('getLastOverLay') as any).onclick = () => {
      // tslint:disable-next-line: no-use-before-declare
      if (this.overlays.length) {
        // tslint:disable-next-line: no-use-before-declare
        alert(this.overlays[this.overlays.length - 1]);
      } else {
        alert('没有覆盖物');
      }
    };

    this.getElment('showPanelBtn').onclick = () => {
      if (this.isPanelShow === false) {
        this.isPanelShow = true;
        this.getElment('showPanelBtn').style.right = '230px';
        this.getElment('panelWrap').style.width = '230px';
        this.getElment('map').style.marginRight = '230px';
        this.getElment('showPanelBtn').innerHTML = '隐藏绘制结果信息<br/>>';
      } else {
        this.isPanelShow = false;
        this.getElment('showPanelBtn').style.right = '0px';
        this.getElment('panelWrap').style.width = '0px';
        this.getElment('map').style.marginRight = '0px';
        this.getElment('showPanelBtn').innerHTML = '显示绘制结果信息<br/><';
      }
    };
  }

  // echarts配置项，http://echarts.baidu.com/option.html#title
  setSeries(echartsData) {
    const series = [];
    echartsData.map((Item) => {
      series.push({
        name: Item.fromName,
        type: 'effectScatter',
        coordinateSystem: 'bmap',
        zlevel: 2,
        rippleEffect: {
          brushType: 'stroke'
        },
        label: {
          normal: {
            show: true,
            position: 'right',
            formatter: '{b}'
          }
        },
        symbolSize: (val) => {
          return val[2] / 4;
        },
        showEffectOn: 'render',
        itemStyle: {
          normal: {
            color: '#C82C2B'
          }
        },
        data: [{
          name: Item.fromName,
          value: Item.coords[0].concat([120])
        }]
      },
        {
          name: Item.fromName,
          type: 'lines',
          coordinateSystem: 'bmap',
          zlevel: 1,
          effect: {
            show: true,
            period: 6,
            trailLength: 0.7,
            color: '#fff',
            symbolSize: 3
          },
          lineStyle: {
            normal: {
              color: '#C82C2B',
              width: 0,
              curveness: 0.2
            }
          },
          data: echartsData
        },
        {
          name: Item.fromName,
          type: 'lines',
          coordinateSystem: 'bmap',
          zlevel: 2,
          effect: {
            show: true,
            period: 6,
            trailLength: 0,
            symbol: 'arrow',
            symbolSize: 10
          },
          lineStyle: {
            normal: {
              color: '#C82C2B',
              width: 1,
              opacity: 0.4,
              curveness: 0.2
            }
          },
          data: echartsData
        },
        {
          name: Item.fromName,
          type: 'effectScatter',
          coordinateSystem: 'bmap',
          zlevel: 2,
          rippleEffect: {
            brushType: 'stroke'
          },
          label: {
            normal: {
              show: true,
              position: 'right',
              formatter: '{b}'
            }
          },
          symbolSize: (val) => {
            return val[2] / 8;
          },
          itemStyle: {
            normal: {
              color: '#C82C2B'
            }
          },
          data: echartsData.map((dataItem) => {
            return {
              name: dataItem.toName,
              value: dataItem.coords[1].concat(100)
            };
          })
        });
    });
    return series;
  }

  // echarts配置项，http://echarts.baidu.com/option.html#title
  setOptions(center, zoom, series) {
    const option = {
      tooltip: {
        trigger: 'item'
      },
      bmap: {
        center,
        zoom,
        roam: true,
        label: {
          normal: {
            show: true,
            position: 'right',
            formatter: '{b}',
            textStyle: {
              fontSize: 15
            }
          }
        },
        mapStyle: {
          styleJson: [
            {
              featureType: 'water',
              elementType: 'all',
              stylers: {
                color: '#103446'
              }
            },
            {
              featureType: 'land',
              elementType: 'geometry',
              stylers: {
                color: '#1E2D1E'
              }
            },
            {
              featureType: 'highway',
              elementType: 'all',
              stylers: {
                visibility: 'off'
              }
            },
            {
              featureType: 'arterial',
              elementType: 'geometry.fill',
              stylers: {
                color: '#1E2D1E'
              }
            },
            {
              featureType: 'arterial',
              elementType: 'geometry.stroke',
              stylers: {
                color: '#0b3d51'
              }
            },
            {
              featureType: 'local',
              elementType: 'geometry',
              stylers: {
                color: '#1E2D1E'
              }
            },
            {
              featureType: 'railway',
              elementType: 'geometry.fill',
              stylers: {
                color: '#1E2D1E'
              }
            },
            {
              featureType: 'railway',
              elementType: 'geometry.stroke',
              stylers: {
                color: '#08304b'
              }
            },
            {
              featureType: 'subway',
              elementType: 'geometry',
              stylers: {
                lightness: -70
              }
            },
            {
              featureType: 'building',
              elementType: 'geometry.fill',
              stylers: {
                color: '#1E2D1E'
              }
            },
            {
              featureType: 'all',
              elementType: 'labels.text.fill',
              stylers: {
                color: '#857f7f'
              }
            },
            {
              featureType: 'all',
              elementType: 'labels.text.stroke',
              stylers: {
                color: '#1E2D1E'
              }
            },
            {
              featureType: 'building',
              elementType: 'geometry',
              stylers: {
                color: '#1E2D1E'
              }
            },
            {
              featureType: 'green',
              elementType: 'geometry',
              stylers: {
                color: '#0d2d1a'
              }
            },
            {
              featureType: 'boundary',
              elementType: 'all',
              stylers: {
                color: '#3e6c60'
              }
            },
            {
              featureType: 'manmade',
              elementType: 'all',
              stylers: {
                color: '#1E2D1E'
              }
            }
          ]
        }
      },
      series
    };
    return option;
  }

  // 设置地图
  setMap(map) {
    setInterval(() => {
      map.closeInfoWindow();
    }, 1);
    // 启动鼠标滚轮操作
    map.enableScrollWheelZoom(true);
    // 添加带有定位的导航控件
    const navigationControl = new BMap.NavigationControl({
      anchor: BMAP_ANCHOR_TOP_LEFT,
      type: BMAP_NAVIGATION_CONTROL_LARGE,
      enableGeolocation: true
    });
    map.addControl(navigationControl);
    // 监听地图缩放
    map.addEventListener('zoomend', () => {
      this.funcAddMapMaker(map);
    });
    this.funcAddMapMaker(map);
  }

  funcAddMapMaker(map) {
    const flag = map.getZoom(); // 获取缩放等级
    const centerLoc = [map.getCenter().lng, map.getCenter().lat]; // 获取当前地图中心经纬度
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.buildMarkers.length; i++) {
      map.removeOverlay(this.buildMarkers[i]); //  移除标记
    }
    if (flag < 11) {　// 等级小于11，展示效果图一
      this.myChart.setOption(this.setOptions(centerLoc, flag,
        this.setSeries(this.echartsDatas))); // echarts可通过setOption异步加载与更新数据
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.markerArr.length; i++) {
        const markerPoint = new BMap.Point(this.markerArr[i].long, this.markerArr[i].lat);
        const marker = new BMap.Marker(markerPoint);
        map.addOverlay(marker); // 地图上添加标记
        this.buildMarkers[this.buildMarkers.length] = marker;
        marker.addEventListener('click', () => {
          map.centerAndZoom(markerPoint, 12); // 点击标记后放大地图到等级12
        });
      }
    } else if (flag >= 11 && flag < 16) { // 等级大于11小于16，展示效果图二
      this.myChart.setOption(this.setOptions(centerLoc, flag,
        this.setSeries(this.echartsDatas1))); // echarts可通过setOption异步加载与更新数据
      // tslint:disable-next-line: prefer-for-of
      for (let j = 0; j < this.yuanData.length; j++) {
        const yuanPoint = new BMap.Point(this.yuanData[j].long, this.yuanData[j].lat);
        const yuanMarker = new BMap.Marker(yuanPoint);
        map.addOverlay(yuanMarker); // 地图上添加标记
        this.buildMarkers[this.buildMarkers.length] = yuanMarker;
        yuanMarker.addEventListener('click', () => {
          map.centerAndZoom(yuanPoint, 17); // 点击标记后放大地图到等级17
        });
      }
    } else { // 等级大于16，展示效果图三
      this.myChart.setOption(this.setOptions(centerLoc, flag,
        null)); // echarts可通过setOption异步加载与更新数据
      // tslint:disable-next-line: prefer-for-of
      for (let k = 0; k < this.buildData.length; k++) {
        const buildPoint = new BMap.Point(this.buildData[k].long, this.buildData[k].lat);
        const buildMarker = new BMap.Marker(buildPoint);
        map.addOverlay(buildMarker); // 地图上添加标记
        this.buildMarkers[this.buildMarkers.length] = buildMarker;
        const buildLabel = new BMap.Label(this.buildData[k].address, { offset: new BMap.Size(10, 17) });
        buildLabel.setStyle({
          color: 'white',
          fontSize: '10px',
          border: 'hidden',
          backgroundColor: 'rgba(0,0,0,0)'
        });
        buildMarker.setLabel(buildLabel); // 设置文字标签
      }
    }
  }

  // 回调获得覆盖物信息
  overlaycomplete(e: any, overlays: any) {
    overlays.push(e.overlay);
    let result = '';
    result = '<p>';
    result += e.drawingMode + ':';
    // tslint:disable-next-line: triple-equals
    if (e.drawingMode == BMAP_DRAWING_MARKER) {
      result += ' 坐标：' + e.overlay.getPosition().lng + ',' + e.overlay.getPosition().lat;
      if ((this.getElment('isInfowindow') as any).checked) {
        this.searchInfoWindow.open(e.overlay);
      }
    }
    if (e.drawingMode === BMAP_DRAWING_CIRCLE) {
      result += ' 半径：' + e.overlay.getRadius();
      result += ' 中心点：' + e.overlay.getCenter().lng + ',' + e.overlay.getCenter().lat;
    }
    if (e.drawingMode === BMAP_DRAWING_POLYLINE || e.drawingMode === BMAP_DRAWING_POLYGON || e.drawingMode === BMAP_DRAWING_RECTANGLE) {
      result += ' 所画的点个数：' + e.overlay.getPath().length;
    }
    result += '</p>';
    this.getElment('showOverlayInfo').style.display = 'none';
    this.getElment('panel').innerHTML += result; // 将绘制的覆盖物信息结果输出到结果面板
  }

  clearAll() {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.overlays.length; i++) {
      this.bmap.removeOverlay(this.overlays[i]);
    }
    this.overlays.length = 0;
  }


  getElment(id) {
    return document.getElementById(id);
  }

  // tslint:disable-next-line: member-ordering
  isPanelShow = false;


  alertFun() {
    alert(this.overlays.length);
  }

  openDraw() {
    this.drawingManager.open();
  }

  closeDraw() {
    this.drawingManager.close();
  }

  enableCalculate() {
    this.drawingManager.enableCalculate();
  }

  disableCalculate() {
    this.drawingManager.disableCalculate();
  }
  setDrawingMode(flag) {
    this.drawingManager.setDrawingMode(flag);
  }
}
