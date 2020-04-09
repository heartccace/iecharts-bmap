import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { BasicComponent } from './basic/basic.component';
import { EchartsInstanceComponent } from './echarts-instance/echarts-instance.component';
import { EventsComponent } from './events/events.component';
import { ThemeComponent } from './theme/theme.component';
import { LoadingComponent } from './loading/loading.component';
import { UpdateChartComponent } from './update-chart/update-chart.component';
import { InitOptsComponent } from './init-opts/init-opts.component';
import { AutoResizeComponent } from './auto-resize/auto-resize.component';
import { BmapComponent } from './bmap/bmap.component';
import { BaiduMapModule } from 'angular2-baidu-map';

@NgModule({
  declarations: [
    AppComponent,
    BasicComponent,
    EchartsInstanceComponent,
    EventsComponent,
    ThemeComponent,
    LoadingComponent,
    UpdateChartComponent,
    InitOptsComponent,
    AutoResizeComponent,
    BmapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxEchartsModule,
    BaiduMapModule.forRoot({ ak: 'ozfsQdEuwiEIQf8CkYGoWyxislgAunW3' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
