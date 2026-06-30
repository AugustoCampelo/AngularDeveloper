// angular import
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

// rxjs import
import { Observable } from 'rxjs';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MonthlyBarChartComponent } from 'src/app/theme/shared/apexchart/monthly-bar-chart/monthly-bar-chart.component';
import { IncomeOverviewChartComponent } from 'src/app/theme/shared/apexchart/income-overview-chart/income-overview-chart.component';
import { AnalyticsChartComponent } from 'src/app/theme/shared/apexchart/analytics-chart/analytics-chart.component';
import { SalesReportChartComponent } from 'src/app/theme/shared/apexchart/sales-report-chart/sales-report-chart.component';
import { DefaultService } from './default.service';
import { AnalyticCard, RecentOrder, TransactionHistory } from './default-type';

// icons
import { IconService } from '@ant-design/icons-angular';
import { FallOutline, GiftOutline, MessageOutline, RiseOutline, SettingOutline } from '@ant-design/icons-angular/icons';

@Component({
  selector: 'app-default',
  imports: [
    CommonModule,
    SharedModule,
    MonthlyBarChartComponent,
    IncomeOverviewChartComponent,
    AnalyticsChartComponent,
    SalesReportChartComponent
  ],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  providers: [DefaultService]
})
export class DefaultComponent {
  private service = inject(DefaultService);
  private iconService = inject(IconService);

  // public props (View consumes these via async pipe)
  analytics$: Observable<AnalyticCard[]> = this.service.analytics$;
  recentOrders$: Observable<RecentOrder[]> = this.service.recentOrders$;
  transactions$: Observable<TransactionHistory[]> = this.service.transactions$;

  // constructor
  constructor() {
    this.iconService.addIcon(...[RiseOutline, FallOutline, SettingOutline, GiftOutline, MessageOutline]);
  }
}
