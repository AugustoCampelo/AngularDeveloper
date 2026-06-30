// angular import
import { Injectable } from '@angular/core';

// rxjs import
import { BehaviorSubject, Observable } from 'rxjs';

// project import
import { AnalyticCard, RecentOrder, TransactionHistory } from './default-type';
import { ANALYTICS, RECENT_ORDERS, TRANSACTIONS } from './default-data';

/**
 * Facade for the default dashboard. Hides the data source behind observables
 * (Observer pattern). Swap the seeds below for HttpClient calls when wiring a
 * real backend — the component contract stays the same.
 */
@Injectable()
export class DefaultService {
  private _analytics$ = new BehaviorSubject<AnalyticCard[]>(ANALYTICS);
  private _recentOrders$ = new BehaviorSubject<RecentOrder[]>(RECENT_ORDERS);
  private _transactions$ = new BehaviorSubject<TransactionHistory[]>(TRANSACTIONS);

  get analytics$(): Observable<AnalyticCard[]> {
    return this._analytics$.asObservable();
  }
  get recentOrders$(): Observable<RecentOrder[]> {
    return this._recentOrders$.asObservable();
  }
  get transactions$(): Observable<TransactionHistory[]> {
    return this._transactions$.asObservable();
  }
}
