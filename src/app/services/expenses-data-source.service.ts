import { Expense } from './../models/expense';
import { Injectable } from '@angular/core';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { Observable, BehaviorSubject } from 'rxjs';
import { ExpensesService } from './expenses.service';
import {catchError, finalize} from 'rxjs/operators';
import {of} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ExpensesDataSourceService implements DataSource<Expense> {
  private expenseSubject$ = new BehaviorSubject<Expense[]>([]);
  private loadingSubject$ = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject$.asObservable();

  constructor(private expenseServ: ExpensesService) { }

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    return this.expenseSubject$.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.expenseSubject$.complete();
    this.loadingSubject$.complete();
  }

  loadExpenses(page = 1) {
    this.loadingSubject$.next(true);

    this.expenseServ.getPaginedExpenses(page)
    .pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject$.next(false))
    )
      .subscribe(expenses => this.expenseSubject$.next(expenses));
  }
}
