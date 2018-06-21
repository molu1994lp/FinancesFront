import { ExpensesDataSourceService } from './../../services/expenses-data-source.service';
import { Component, OnInit } from '@angular/core';
import { ExpensesService } from '../../services/expenses.service';


@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.sass'],
  providers: [ExpensesService]
})
export class ExpensesComponent implements OnInit {
  categories;
  expenses: ExpensesDataSourceService;
  subcategory: string;
  value: number;
  activeCategoryIndex: number;
  date: Date;
  displayedColumns = ['number', 'category', 'subcategory', 'value', 'date', 'action' ];

  constructor(private expenseServ: ExpensesService, private expeseDataSourceServ: ExpensesDataSourceService) {
    this.date = new Date();
  }

  ngOnInit() {
    this.expenseServ.getCategories()
      .subscribe(resp => {
        this.categories = resp;
      }, error => console.log(error));

      this.expenses = new ExpensesDataSourceService(this.expenseServ);
      this.expenses.loadExpenses(1);

    // this.expenseServ.getExpenses()
    //   .subscribe(resp => {
    //     this.expenses = resp;
    //   }, error => console.log(error));

  }

  // submit(form) {
  //   this.expenseServ.addExpense(this.categories[this.activeCategoryIndex].name, this.value, this.date, this.subcategory)
  //     .subscribe(resp => {
  //       this.expenses.shift(resp);
  //     }, error => console.log(error));
  // }
}
