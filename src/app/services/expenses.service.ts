import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get(environment.api + `api/category`);
  }

  getExpenses() {
    return this.http.get(environment.api + `api/expense`);
  }

  addExpense(category: string, value: number, date: Date, subcategory?: string) {
    const body = {
      category: category,
      value: value,
      date: date,
      subcategory: ''
    };
    if (subcategory) {body[`subcategory`] = subcategory; }

    return this.http.post(environment.api + `api/expense`, body);
  }

  getPaginedExpenses(page) {
    return this.http.get(environment.api + `api/expense/${page}`);
  }
}
