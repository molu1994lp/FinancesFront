import { TestBed, inject } from '@angular/core/testing';

import { ExpensesDataSourceService } from './expenses-data-source.service';

describe('ExpensesDataSourceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExpensesDataSourceService]
    });
  });

  it('should be created', inject([ExpensesDataSourceService], (service: ExpensesDataSourceService) => {
    expect(service).toBeTruthy();
  }));
});
